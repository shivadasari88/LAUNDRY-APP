import React, { createContext, useContext, useState } from 'react';
/* eslint-disable react-refresh/only-export-components */

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);

    const addToCart = (item, shop) => {
        // If adding item from a different shop, confirm reset or handle logic
        // For simplicity here: if shop is different, we replace the cart or warn.
        // We'll implementing a simple "replace if new shop" for now.

        if (selectedShop && selectedShop.id !== shop.id) {
            // Simple logic: Clear cart if switching shops (or just allow mixed for now if no constraint)
            // Prompt said "Cart affects the Shop Price on the Services page", suggesting shop-specific.
            // We will clear cart if shop changes to keep it simple.
            setCartItems([]);
        }
        setSelectedShop(shop);

        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, count: i.count + 1 } : i);
            }
            return [...prev, { ...item, count: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.reduce((acc, item) => {
            if (item.id === itemId) {
                if (item.count > 1) {
                    acc.push({ ...item, count: item.count - 1 });
                }
                // If count is 1, it gets removed (skipped in reduce)
            } else {
                acc.push(item);
            }
            return acc;
        }, []));
    };

    const clearCart = () => {
        setCartItems([]);
        setSelectedShop(null);
    }

    const setShop = (shop) => {
        setSelectedShop(shop);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);

    return (
        <CartContext.Provider value={{ cartItems, selectedShop, addToCart, removeFromCart, clearCart, setShop, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
