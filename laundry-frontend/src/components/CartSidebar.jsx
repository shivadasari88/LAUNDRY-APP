// src/components/CartSidebar.jsx - Updated with Landing Page Styling
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose, shopId }) => {
  const { 
    cartItems, 
    cartShopId, 
    totalItems,
    totalAmount,
    removeItemFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  if (!isOpen) return null;

  // Check if cart has items from different shop
  const hasDifferentShopItems = cartShopId && cartShopId !== shopId;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Sidebar - Updated with gradient */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-linear-to-b from-blue-500 to-indigo-700 shadow-2xl z-50 overflow-y-auto">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/20">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <p className="text-sm text-white/70 mt-1">
                {totalItems} item{totalItems !== 1 ? 's' : ''} 
                {cartShopId && <span className="ml-2">• Shop #{cartShopId}</span>}
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
                    onClick={clearCart}
                    className="mt-3 px-4 py-2 bg-white text-blue-700 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          {cartItems.length === 0 ? (
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
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    {/* Group Item Display */}
                    {item.groupName ? (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-lg text-white">{item.groupName}</h4>
                              <span className="px-2 py-1 text-xs bg-white/30 text-white rounded-full">
                                Group
                              </span>
                            </div>
                            <p className="text-sm text-white/70">
                              {item.items?.length || 0} specs • {item.totalQuantity || 0} pieces
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItemFromCart(index)}
                            className="text-white hover:text-red-200 p-1 rounded-full hover:bg-white/10"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Group Images */}
                        {item.images && item.images.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-white/60 mb-2">Uploaded photos:</p>
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                              {item.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="w-16 h-16 shrink-0 relative">
                                  <img 
                                    src={img.url} 
                                    alt={`Group ${imgIndex + 1}`}
                                    className="w-full h-full object-cover rounded-lg border-2 border-white/30"
                                  />
                                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border border-white">
                                    {imgIndex + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Items in Group */}
                        <div className="space-y-2 mt-3 pt-3 border-t border-white/20">
                          <p className="text-sm font-medium text-white/90">Items in this group:</p>
                          {item.items?.map((subItem, subIndex) => (
                            <div key={subIndex} className="bg-white/10 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-white">{subItem.name}</span>
                                <span className="text-white/70 text-sm">Qty: {subItem.quantity}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${subItem.service === 'Dry Cleaning' 
                                  ? 'bg-red-500/30 text-red-100' 
                                  : 'bg-green-500/30 text-green-100'}`}>
                                  {subItem.service}
                                </span>
                                {subItem.fabricType && (
                                  <span className="px-2 py-1 text-xs bg-white/20 text-white/90 rounded-full">
                                    {subItem.fabricType}
                                  </span>
                                )}
                              </div>
                              {subItem.specialInstructions && (
                                <div className="mt-2 flex items-start gap-1">
                                  <span className="text-white/70 mt-0.5">📝</span>
                                  <p className="text-xs text-white/80 flex-1">
                                    {subItem.specialInstructions}
                                  </p>
                                </div>
                              )}
                              <p className="text-xs text-white/60 mt-2">
                                📷 Photo {subItem.imageIndex + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      /* Single Item Display */
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-white">{item.name}</h4>
                            <p className="text-sm text-white/70">
                              Service: {item.service}
                              {item.fabricType && <span className="ml-2">• Fabric: {item.fabricType}</span>}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItemFromCart(index)}
                            className="text-white hover:text-red-200 p-1 rounded-full hover:bg-white/10"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Images preview for single items */}
                        {item.images && item.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {item.images.slice(0, 3).map((img, imgIndex) => (
                              <div key={imgIndex} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/30">
                                <img 
                                  src={img} 
                                  alt={`Item ${imgIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {item.images.length > 3 && (
                              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xs border-2 border-white/30 text-white">
                                +{item.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-l-lg bg-white/10 text-white hover:bg-white/20"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              -
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center border-t border-b border-white/30 bg-white/5 text-white">
                              {item.quantity}
                            </div>
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-r-lg bg-white/10 text-white hover:bg-white/20"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="font-bold text-white text-lg">
                            ₹{item.price || 0}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Price for this item/group */}
                    <div className="mt-4 pt-3 border-t border-white/20 text-right">
                      <span className="font-bold text-white text-xl">
                        ₹{item.groupName ? item.totalPrice : item.price}
                      </span>
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
                    onClick={clearCart}
                    className="w-full py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Clear Entire Cart
                  </button>
                  <button
                    className="w-full py-3 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={hasDifferentShopItems}
                    onClick={() => {
                      alert(`Order placed successfully!\nTotal: ₹${(totalAmount + 20 + (totalAmount * 0.18)).toFixed(2)}\nItems: ${totalItems}`);
                      clearCart();
                      onClose();
                    }}
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