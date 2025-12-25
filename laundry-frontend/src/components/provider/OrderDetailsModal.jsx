// src/components/provider/OrderDetailsModal.jsx
import { useState } from 'react';

const OrderDetailsModal = ({ order, onClose, onStatusUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'pending');

  if (!order) return null;

  // Mock order data with customer photos and specifications
  const orderDetails = {
    ...order,
    customerPhotos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 
        description: 'Front view of shirts', items: ['Shirt 1', 'Shirt 2'] },
      { id: 2, url: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w-400', 
        description: 'Close-up of stains', items: ['Shirt 3'] },
      { id: 3, url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', 
        description: 'All items together', items: ['Shirt 4', 'Shirt 5'] }
    ],
    items: [
      { id: 1, name: 'Shirt 1', service: 'Washing', fabric: 'Cotton', quantity: 1, 
        instructions: 'Remove ink stain on sleeve', imageIndex: 0 },
      { id: 2, name: 'Shirt 2', service: 'Washing', fabric: 'Polyester', quantity: 1, 
        instructions: 'Regular wash', imageIndex: 0 },
      { id: 3, name: 'Shirt 3', service: 'Dry Cleaning', fabric: 'Silk', quantity: 1, 
        instructions: 'Handle with care - delicate fabric', imageIndex: 1 },
      { id: 4, name: 'Shirt 4', service: 'Washing + Ironing', fabric: 'Cotton', quantity: 1, 
        instructions: 'Medium starch', imageIndex: 2 },
      { id: 5, name: 'Shirt 5', service: 'Ironing', fabric: 'Linen', quantity: 1, 
        instructions: 'Sharp creases', imageIndex: 2 }
    ],
    timeline: [
      { time: '10:00 AM', status: 'Order Placed', description: 'Customer placed order' },
      { time: '10:30 AM', status: 'Pickup Scheduled', description: 'Pickup at 2:00 PM' },
      { time: '2:15 PM', status: 'Picked Up', description: 'Items collected from customer' },
      { time: '3:00 PM', status: 'Processing', description: 'Washing in progress' }
    ]
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500/20 text-yellow-300' },
    { value: 'accepted', label: 'Accepted', color: 'bg-blue-500/20 text-blue-300' },
    { value: 'processing', label: 'Processing', color: 'bg-purple-500/20 text-purple-300' },
    { value: 'ready', label: 'Ready', color: 'bg-green-500/20 text-green-300' },
    { value: 'delivered', label: 'Delivered', color: 'bg-emerald-500/20 text-emerald-300' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500/20 text-red-300' }
  ];

  const handleStatusUpdate = () => {
    if (onStatusUpdate) {
      onStatusUpdate(order.id, currentStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-lg px-8 py-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Order #{orderDetails.id}</h2>
              <p className="text-white/70">Customer: {orderDetails.customerName} • ₹{orderDetails.amount}</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Photos & Items */}
            <div>
              {/* Customer Photos */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-300">📸</span>
                  Customer Photos
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {orderDetails.customerPhotos.map((photo, index) => (
                    <div 
                      key={photo.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-blue-400 shadow-lg shadow-blue-500/30' 
                          : 'border-white/20 hover:border-blue-300'
                      }`}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.description}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs truncate">{photo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Selected Photo Preview */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      Photo {selectedImage + 1} of {orderDetails.customerPhotos.length}
                    </span>
                  </div>
                  <img 
                    src={orderDetails.customerPhotos[selectedImage].url} 
                    alt="Selected"
                    className="w-full h-64 object-contain rounded-xl bg-black/20"
                  />
                  <div className="mt-3 text-white/80">
                    {orderDetails.customerPhotos[selectedImage].description}
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    Items in this photo: {orderDetails.customerPhotos[selectedImage].items.join(', ')}
                  </div>
                </div>
              </div>

              {/* Item Specifications */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-green-300">🛍️</span>
                  Item Specifications
                </h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            item.service === 'Dry Cleaning' 
                              ? 'bg-red-500/20 text-red-300' 
                              : item.service === 'Washing + Ironing'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-green-500/20 text-green-300'
                          }`}>
                            {item.service}
                          </span>
                          <span className="text-xs text-white/50">
                            Photo {item.imageIndex + 1}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white/60">Fabric</div>
                          <div className="text-white">{item.fabric}</div>
                        </div>
                        <div>
                          <div className="text-white/60">Quantity</div>
                          <div className="text-white">{item.quantity} piece</div>
                        </div>
                      </div>
                      {item.instructions && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="text-white/60 text-sm">Special Instructions:</div>
                          <div className="text-white text-sm">📝 {item.instructions}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Info & Timeline */}
            <div>
              {/* Order Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-300">📋</span>
                  Order Information
                </h3>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-white/60 text-sm mb-1">Customer Name</div>
                      <div className="text-white font-medium">{orderDetails.customerName}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Contact</div>
                      <div className="text-white">+91 98765 43210</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Pickup Address</div>
                      <div className="text-white">123 Main St, Mumbai</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Delivery Address</div>
                      <div className="text-white">Same as pickup</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Pickup Time</div>
                      <div className="text-white">Today, 2:00 PM</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Delivery Time</div>
                      <div className="text-white">Tomorrow, 10:00 AM</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white/60 text-sm">Total Items</div>
                        <div className="text-2xl font-bold text-white">{orderDetails.items.length}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Total Pieces</div>
                        <div className="text-2xl font-bold text-white">
                          {orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Order Amount</div>
                        <div className="text-2xl font-bold text-white">₹{orderDetails.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-300">⏱️</span>
                  Order Timeline
                </h3>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="space-y-6">
                    {orderDetails.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white">
                              {index === orderDetails.timeline.length - 1 ? '🔄' : '✓'}
                            </span>
                          </div>
                          {index < orderDetails.timeline.length - 1 && (
                            <div className="absolute left-5 top-10 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium text-white">{event.status}</div>
                            <div className="text-white/60 text-sm">{event.time}</div>
                          </div>
                          <div className="text-white/70">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/20">
                <h4 className="font-bold text-white mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2">
                    📞 Call Customer
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2">
                    💬 Send Update
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 transition-colors flex items-center justify-center gap-2">
                    📍 Track Delivery
                  </button>
                  <button 
                    onClick={handleStatusUpdate}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    ✅ Update Status
                  </button>
                </div>
                <div className="mt-4 text-sm text-white/60">
                  Current status will be updated to: <span className="text-white font-medium">{currentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-red-300">⚠️</span>
              Customer Special Instructions
            </h3>
            <div className="bg-red-500/10 rounded-2xl p-6 border border-red-400/30">
              <div className="text-white">
                • Please use gentle detergent for all silk items
                <br />
                • Remove ink stain from shirt sleeve (see photo 2)
                <br />
                • Medium starch for formal shirts
                <br />
                • Package items separately in cloth bags
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;