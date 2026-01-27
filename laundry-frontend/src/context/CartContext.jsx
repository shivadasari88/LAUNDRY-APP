import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { initCart, addItemToBackend, confirmOrder } from '../api/cartApi';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartShopId, setCartShopId] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // ✅ 1. Robust Total Calculation
  useEffect(() => {
    const itemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const amount = cartItems.reduce((sum, item) => {
        // If grouped item (from modal), it has a specific totalPrice
        if (item.totalPrice !== undefined && item.totalPrice !== null) {
            return sum + Number(item.totalPrice);
        }
        // If simple item
        return sum + (Number(item.price || 0) * (item.quantity || 1));
    }, 0);

    setTotalItems(itemsCount);
    setTotalAmount(isNaN(amount) ? 0 : parseFloat(amount.toFixed(2)));
  }, [cartItems]);

  // ✅ 2. Add Item (Strict Mode)
  const addItemToCart = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login to add items to cart.");
        return;
    }

    if (cartShopId && cartShopId !== item.shopId) {
      if (window.confirm("Cart has items from another shop. Clear it?")) {
        clearCart();
      } else return;
    }

    try {
        let orderId = currentOrderId;
        let groupId = currentGroupId;

        // Init Order
        if (!orderId) {
            const initRes = await initCart(user.id, item.shopId);
            orderId = initRes.data.orderId;
            setCurrentOrderId(orderId);
            setCartShopId(item.shopId);
        }

        // Create Group
        if (!groupId) {
            const groupRes = await axios.post(`http://localhost:8080/api/customer/cart/groups`, null, {
                params: { orderId: orderId, groupName: "My Items" }
            });
            groupId = groupRes.data.id;
            setCurrentGroupId(groupId);
        }

        // Prepare Payload
        // 🔥 FIX: Ensure price is sent to prevent Backend Crash
        const finalPrice = item.totalPrice !== undefined ? item.totalPrice : item.price;

        const payload = {
            groupId: groupId, 
            itemName: item.groupName || item.name,
            serviceType: item.serviceTypes ? item.serviceTypes[0] : "Washing",
            fabricType: item.category || "Standard",
            quantity: item.totalQuantity || item.quantity || 1,
            instructions: item.specialInstructions || "Added via App",
            price: Number(finalPrice || 0) // ✅ FIX: Must be a number
        };
        
        await addItemToBackend(payload); 

        // Update UI only if backend success
        setCartItems(prev => [...prev, item]);
        if (!cartShopId) setCartShopId(item.shopId);

    } catch (error) {
        console.error("Cart Sync Error:", error);
        alert("Failed to add item. Check console.");
    }
  };

  const removeItemFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    if (cartItems.length <= 1) {
        setCartShopId(null);
        setCurrentOrderId(null);
        setCurrentGroupId(null);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartShopId(null);
    setCurrentOrderId(null);
    setCurrentGroupId(null);
  };

  const checkout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!currentOrderId) {
        alert("Cart is empty.");
        return false;
    }

    try {
      await confirmOrder(currentOrderId, user.id);
      clearCart();
      return true; 
    } catch (error) {
      if (error.response?.data?.message?.includes("already confirmed")) {
          clearCart();
          return true;
      }
      alert("Checkout failed: " + (error.response?.data?.message || "Unknown error"));
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, cartShopId, totalItems, totalAmount, currentOrderId, 
      addItemToCart, removeItemFromCart, clearCart, checkout 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);