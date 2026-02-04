// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ STEP 1: INIT CART (DRAFT ORDER)
  const initCart = async (shopIdParam) => {
    // If we already have an orderId for THIS shop, return it
    if (orderId && shopId === shopIdParam) return orderId;

    setLoading(true);
    try {
      const res = await api.post('/customer/cart/init', null, {
        params: { shopId: shopIdParam }
      });
      const data = res.data;

      setOrderId(data.orderId);
      setShopId(data.shopId);
      return data.orderId;
    } catch (error) {
      console.error("Init Cart Failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 2: CREATE GROUP
  const createGroup = async (currentOrderId, groupName) => {
    const res = await api.post('/customer/cart/groups', null, {
      params: { orderId: currentOrderId, groupName: groupName }
    });
    return res.data; // returns group object with id
  };

  // ✅ STEP 3: ADD ITEM
  const addItem = async (payload) => {
    const res = await api.post('/customer/cart/item', payload);
    return res.data;
  };

  // ✅ STEP 4: REFRESH CART
  const refreshCart = async () => {
    const res = await api.get('/customer/cart/view');
    const data = res.data;
    setCart(data);

    // Sync state if reloading page
    if (data && data.orderId) {
      setOrderId(data.orderId);
      setShopId(data.shopId);
    }

    return data;
  };

  // ✅ NEW: ORCHESTRATOR - SYNC GROUP TO BACKEND
  const syncGroupToBackend = async (groupData) => {
    setLoading(true);
    try {
      // 1. Init Cart (or get existing)
      const currentShopId = groupData.baseItem.shopId || shopId;
      if (!currentShopId) throw new Error("Shop ID missing");

      const currentOrderId = await initCart(currentShopId);

      // 2. Create Group
      const group = await createGroup(currentOrderId, groupData.groupName);
      const groupId = group.groupId;

      // 3. Loop & Add Items
      const promises = groupData.items.map(item => {
        return addItem({
          orderId: currentOrderId,
          groupId: groupId,
          serviceItemId: groupData.baseItem.id,
          serviceType: item.service,
          fabricType: item.fabricType,
          quantity: item.quantity,
          instructions: item.specialInstructions,
          price: item.price
        });
      });

      await Promise.all(promises);

      // 4. Refresh Cart
      await refreshCart();

    } catch (error) {
      console.error("Sync Failed:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 5: CONFIRM ORDER
  const confirmOrder = async (payload) => {
    const res = await api.post('/customer/order/confirm', payload);
    return res.data;
  };

  // ✅ STEP 6: REMOVE ITEM
  const removeItemFromCart = async (itemId) => {
    await api.delete(`/customer/cart/item/${itemId}`);
  };

  // ✅ STEP 7: UPDATE QUANTITY
  const updateQuantity = async (itemId, quantity) => {
    await api.put(`/customer/cart/item/${itemId}`, null, {
      params: { quantity }
    });
  };

  // ✅ STEP 8: CLEAR CART
  const clearCart = async () => {
    await api.delete('/customer/cart/clear');
    setCart(null);
    setOrderId(null);
    setShopId(null);
  };

  // Calculate derived state: flattened cart items
  const cartItems = (cart?.groups || []).flatMap(group =>
    (group.items || []).map(item => ({
      ...item,
      groupName: group.groupName,
      groupId: group.groupId
    }))
  );

  return (
    <CartContext.Provider
      value={{
        orderId,
        shopId,
        cart,
        cartItems, // Exposed derived state
        loading,
        initCart,
        createGroup,
        addItem,
        refreshCart,
        syncGroupToBackend,
        confirmOrder,
        removeItemFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};