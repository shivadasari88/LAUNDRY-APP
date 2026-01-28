import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose, shopId }) => {
  const context = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  if (!context) return null;

  const { 
    cartItems = [], 
    cartShopId, 
    totalItems = 0,
    totalAmount = 0,
    removeItemFromCart, 
    clearCart,
    checkout 
  } = context;

  if (!isOpen) return null;

  const hasDifferentShopItems = cartShopId && cartShopId !== shopId;

  // ✅ Handle Place Order Click
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // Call the checkout function from Context
    const success = await checkout(); 
    setIsPlacingOrder(false);

    if (success) {
      alert("✅ Order Placed Successfully! The provider has been notified.");
      onClose(); // Close sidebar on success
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-gradient-to-b from-blue-900 to-slate-900 shadow-2xl z-[9999] overflow-y-auto border-l border-white/20">
        <div className="p-6 h-full flex flex-col text-white">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/20">
            <div>
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <p className="text-sm text-white/70 mt-1">
                {totalItems} item{totalItems !== 1 ? 's' : ''} 
                {cartShopId ? ` • Shop #${cartShopId}` : ''}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl p-2">×</button>
          </div>

          {/* Mixed Shop Warning */}
          {hasDifferentShopItems && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-500/50">
              <p className="font-medium mb-2 text-red-200">Mixed Shop Items</p>
              <p className="text-white/80 text-sm mb-3">Clear cart to add items from this shop.</p>
              <button onClick={clearCart} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Clear Cart</button>
            </div>
          )}

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-70">
              <div className="text-7xl mb-4">🛒</div>
              <p className="text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-blue-300 underline">Start Shopping</button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 border border-white/10 relative group">
                  <button 
                    onClick={() => removeItemFromCart(index)}
                    className="absolute top-2 right-2 text-white/50 hover:text-red-400"
                  >
                    ✕
                  </button>
                  <h4 className="font-bold text-lg">{item.groupName || item.name}</h4>
                  {item.items && item.items.map((sub, i) => (
                    <div key={i} className="flex justify-between text-sm text-white/70 mt-1 pl-2 border-l-2 border-white/20">
                      <span>{sub.quantity}x {sub.name}</span>
                      <span>₹{sub.price}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-white/60">Total</span>
                    <span className="font-bold text-xl">₹{item.totalPrice || item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer - Place Order Button */}
          <div className="mt-auto pt-6 border-t border-white/20">
            <div className="flex justify-between mb-4 text-xl font-bold">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
            
            {/* ✅ Updated Button Text & Logic */}
            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || hasDifferentShopItems || isPlacingOrder}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                isPlacingOrder 
                  ? "bg-gray-600 cursor-wait" 
                  : "bg-green-600 hover:bg-green-500 shadow-green-600/30"
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartSidebar;