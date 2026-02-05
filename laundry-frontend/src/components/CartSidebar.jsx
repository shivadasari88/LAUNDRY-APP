import React, { useState } from 'react';

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  shopId, 
  cartItems = [], 
  totalAmount = 0,
  onRemoveItem,
  onClearCart,
  onPlaceOrder 
}) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  if (!isOpen) return null;

  const totalItems = cartItems.length || 0;

  // Handle Place Order Click
  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) return;
    
    setIsPlacingOrder(true);
    
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId') || 1;
      
      // Create order object
      const orderData = {
        shopId: parseInt(shopId),
        userId: userId,
        items: cartItems,
        totalAmount: totalAmount,
        status: 'CONFIRMED'
      };
      
      // Send order to backend
      const orderResponse = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      
      const order = await orderResponse.json();
      const orderId = order.id || order.orderId;
      
      // Send notification for order confirmation
      try {
        await fetch(`http://localhost:8080/api/notifications/order/${orderId}/status/CONFIRMED`, {
          method: 'POST'
        });
        console.log('✅ Order confirmation notification sent');
      } catch (notificationError) {
        console.log('⚠️ Notification optional - order still placed');
      }
      
      // Clear cart
      if (onClearCart) {
        onClearCart();
      }
      
      // Notify parent
      if (onPlaceOrder) {
        onPlaceOrder(orderId);
      }
      
    } catch (error) {
      console.error('Order placement error:', error);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
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
                {shopId ? ` • Shop #${shopId}` : ''}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl p-2">×</button>
          </div>

          {/* Cart Items */}
          {!cartItems || cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-70">
              <div className="text-7xl mb-4">🛒</div>
              <p className="text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-blue-300 underline">Start Shopping</button>
            </div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="mb-4">
                <button 
                  onClick={onClearCart}
                  className="text-sm text-red-300 hover:text-red-200"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 border border-white/10 relative group">
                    <button 
                      onClick={() => onRemoveItem && onRemoveItem(index)}
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

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-white/20">
                <div className="flex justify-between mb-4 text-xl font-bold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
                
                {/* Notification Info */}
                <div className="mb-3 p-3 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/50">
                  <p className="text-sm text-blue-200">
                    🔔 You'll receive order status updates via notifications
                  </p>
                </div>
                
                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!cartItems || cartItems.length === 0 || isPlacingOrder}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                    isPlacingOrder 
                      ? "bg-gray-600 cursor-wait" 
                      : "bg-green-600 hover:bg-green-500 shadow-green-600/30"
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;