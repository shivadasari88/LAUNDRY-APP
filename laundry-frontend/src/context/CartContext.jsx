// src/context/CartContext.jsx - COMPLETE FIXED VERSION
import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartShopId, setCartShopId] = useState(null);

  const addItemToCart = useCallback((item) => {
    setCartItems(prev => {
      // Check if this is a group item
      if (item.groupName) {
        // Add group as new item
        return [...prev, item];
      } else {
        // For single items, check if similar item exists
        const existingIndex = prev.findIndex(
          cartItem => cartItem.id === item.id && cartItem.service === item.service
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
            price: updated[existingIndex].basePrice * (updated[existingIndex].quantity + item.quantity)
          };
          return updated;
        } else {
          return [...prev, item];
        }
      }
    });
    
    // Set shop ID if this is first item from this shop
    if (!cartShopId && item.shopId) {
      setCartShopId(item.shopId);
    }
  }, [cartShopId]);

  const removeItemFromCart = useCallback((index) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      // Clear shop ID if cart is empty
      if (updated.length === 0) {
        setCartShopId(null);
      }
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: newQuantity,
        price: updated[index].basePrice * newQuantity
      };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartShopId(null);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => {
    if (item.groupName) {
      return sum + (item.totalPrice || 0);
    } else {
      return sum + (item.price || 0);
    }
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    if (item.groupName) {
      return sum + (item.totalQuantity || item.items?.length || 1);
    } else {
      return sum + (item.quantity || 1);
    }
  }, 0);

  const value = {
    cartItems,
    cartShopId,
    totalItems,
    addItemToCart,
    removeItemFromCart,
    updateQuantity,
    clearCart,
    totalAmount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};