// src/components/CartSidebar.jsx - COMPLETE FIXED VERSION
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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl z-50 overflow-y-auto animate-slideIn">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Your Cart</h2>
              <p className="text-sm text-gray-500">
                {totalItems} item{totalItems !== 1 ? 's' : ''} • Shop #{cartShopId || 'None'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl p-2"
            >
              ×
            </button>
          </div>

          {hasDifferentShopItems && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                ⚠️ Your cart contains items from a different shop. 
                Please clear cart to add items from this shop.
              </p>
              <button
                onClick={clearCart}
                className="mt-2 text-red-600 text-sm underline"
              >
                Clear Cart
              </button>
            </div>
          )}

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4 opacity-50">🛒</div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">
                Add items from the shop to get started
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    {/* Group Item Display */}
                    {item.groupName ? (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <h4 className="font-bold text-lg">{item.groupName}</h4>
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Group
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.items?.length || 0} specifications • {item.totalQuantity || 0} pieces
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItemFromCart(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Group Images */}
                        {item.images && item.images.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Uploaded photos:</p>
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                              {item.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="w-16 h-16 flex-shrink-0 relative">
                                  <img 
                                    src={img.url} 
                                    alt={`Group ${imgIndex + 1}`}
                                    className="w-full h-full object-cover rounded border"
                                  />
                                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {imgIndex + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Items in Group */}
                        <div className="space-y-2 mt-3 pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700">Items in this group:</p>
                          {item.items?.map((subItem, subIndex) => (
                            <div key={subIndex} className="bg-gray-50 p-2 rounded text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">{subItem.name}</span>
                                <span className="text-gray-600">Qty: {subItem.quantity}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 py-1 text-xs rounded ${subItem.service === 'Dry Cleaning' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-green-100 text-green-800'}`}>
                                  {subItem.service}
                                </span>
                                {subItem.fabricType && (
                                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">
                                    {subItem.fabricType}
                                  </span>
                                )}
                              </div>
                              {subItem.specialInstructions && (
                                <p className="mt-1 text-xs text-gray-600">
                                  📝 {subItem.specialInstructions}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
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
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Service: {item.service}
                              {item.fabricType && ` • Fabric: ${item.fabricType}`}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItemFromCart(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Images preview for single items */}
                        {item.images && item.images.length > 0 && (
                          <div className="flex space-x-2 mb-3">
                            {item.images.slice(0, 3).map((img, imgIndex) => (
                              <div key={imgIndex} className="w-12 h-12 rounded overflow-hidden border">
                                <img 
                                  src={img} 
                                  alt={`Item ${imgIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {item.images.length > 3 && (
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs border">
                                +{item.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-50"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              -
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center border-t border-b">
                              {item.quantity}
                            </div>
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-50"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="font-semibold">
                            ₹{item.price || 0}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Price for this item/group */}
                    <div className="mt-3 pt-3 border-t text-right">
                      <span className="font-medium">
                        ₹{item.groupName ? item.totalPrice : item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Charge</span>
                  <span>₹20</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{(totalAmount + 20 + (totalAmount * 0.18)).toFixed(2)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={clearCart}
                    className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear Entire Cart
                  </button>
                  <button
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </>
          )}

          {/* Cart Tips */}
          <div className="mt-6 pt-6 border-t text-sm text-gray-500">
            <p className="font-medium mb-2">📝 How it works for service providers:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>They see your uploaded photos with your specifications</li>
              <li>Each item is clearly marked with service type and instructions</li>
              <li>They process items exactly as you specified</li>
              <li>Free pickup for orders above ₹300</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;