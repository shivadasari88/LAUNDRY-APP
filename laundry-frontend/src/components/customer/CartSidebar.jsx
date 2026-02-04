// src/components/CartSidebar.jsx - Updated with Landing Page Styling
import { useCart } from '../../context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const { shopId } = useParams();
  const {
    cart,
    cartShopId,
    removeItemFromCart,
    updateQuantity,
    clearCart,
    confirmOrder,
    refreshCart
  } = useCart();

  const navigate = useNavigate();

  if (!isOpen) return null;

  // Flatten logic
  const cartGroups = cart?.groups || [];
  let cartItemsList = [];

  cartGroups.forEach(group => {
    if (group.items) {
      group.items.forEach(item => {
        cartItemsList.push({
          ...item,
          groupName: group.groupName,
          groupId: group.groupId
        });
      });
    }
  });

  const totalAmount = cart?.totalAmount || 0;
  const totalItems = cartItemsList.reduce((acc, item) => acc + item.quantity, 0);

  // Check if cart has items from different shop
  // Only check if we are currently visiting a shop (shopId exists)
  const hasDifferentShopItems = shopId && cart?.shop?.shopId && String(cart.shop.shopId) !== String(shopId);

  const handleClearCart = async () => {
    await clearCart();
    onClose();
    // trigger refresh if needed
  };

  const handleRemove = async (itemId) => {
    await removeItemFromCart(itemId);
    refreshCart();
  };

  const handleUpdateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    await updateQuantity(itemId, newQty);
    refreshCart();
  };

  const handleCheckout = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    // user check still useful for redirect behavior

    try {
      await confirmOrder({
        orderId: cart.orderId,
        // customerId removed
      });
      alert("Order Placed Successfully!");
      clearCart();
      onClose();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar - Updated with gradient */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-gradient-to-b from-slate-900 to-blue-900 shadow-2xl z-50 overflow-y-auto">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/20">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <p className="text-sm text-white/70 mt-1">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
                {cart?.shop && <span className="ml-2">• {cart.shop.name}</span>}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Warning Message */}
          {hasDifferentShopItems && (
            <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <p className="text-white font-medium mb-2">
                    Mixed Shop Items
                  </p>
                  <p className="text-white/90 text-sm">
                    Your cart contains items from a different shop.
                    Please clear cart to add items from this shop.
                  </p>
                  <button
                    onClick={handleClearCart}
                    className="mt-3 px-4 py-2 bg-white text-blue-700 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          {cartItemsList.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10">
              <div className="text-7xl mb-6 opacity-60">🛒</div>
              <p className="text-white text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-white/70 text-center">
                Add items from the shop to get started
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full bg-white text-blue-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Items
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="space-y-4 mb-6">
                {cartItemsList.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        {item.groupName && (
                          <div className="text-xs text-yellow-300 mb-1">Group: {item.groupName}</div>
                        )}
                        <h4 className="font-medium text-white">{item.itemName}</h4>
                        <p className="text-sm text-white/70">
                          {item.serviceType} • {item.fabricType}
                        </p>
                        {item.instructions && (
                          <p className="text-xs text-white/60 italic mt-1">"{item.instructions}"</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item.itemsId || item.itemId || item.id)}
                        className="text-white hover:text-red-200 p-1 rounded-full hover:bg-white/10"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-l-lg bg-white/10 text-white hover:bg-white/20"
                          onClick={() => handleUpdateQty(item.itemsId || item.itemId || item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-t border-b border-white/30 bg-white/5 text-white">
                          {item.quantity}
                        </div>
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-r-lg bg-white/10 text-white hover:bg-white/20"
                          onClick={() => handleUpdateQty(item.itemsId || item.itemId || item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="font-bold text-white text-lg">
                        ₹{item.totalPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-white/30 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Subtotal</span>
                  <span className="text-white">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Service Charge</span>
                  <span className="text-white">₹20</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">GST (18%)</span>
                  <span className="text-white">₹{(totalAmount * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 mt-4 pt-3 border-t border-white/30 font-bold text-xl">
                  <span className="text-white">Total</span>
                  <span className="text-white">₹{(totalAmount + 20 + (totalAmount * 0.18)).toFixed(2)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleClearCart}
                    className="w-full py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Clear Entire Cart
                  </button>
                  <button
                    className="w-full py-3 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={hasDifferentShopItems}
                    onClick={handleCheckout}
                  >
                    {hasDifferentShopItems ? 'Cannot Checkout - Mixed Shops' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>

              {/* Cart Tips */}
              <div className="mt-6 pt-6 border-t border-white/20 text-sm">
                <p className="font-medium text-white mb-3">📝 How it works for service providers:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>They see your uploaded photos with your specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Each item is clearly marked with service type and instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>They process items exactly as you specified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Free pickup for orders above ₹300</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;