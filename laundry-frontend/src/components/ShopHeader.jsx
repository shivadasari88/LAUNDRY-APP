import React from 'react';

const ShopHeader = ({ shop, onCartClick }) => {
  const getServiceColor = (service) => {
    switch(service) {
      case 'Washing': return 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-100 border-blue-400/30';
      case 'Dry Cleaning': return 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-100 border-purple-400/30';
      case 'Ironing': return 'bg-gradient-to-r from-orange-500/20 to-amber-600/10 text-orange-100 border-orange-400/30';
      case 'Washing + Ironing': return 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 text-indigo-100 border-indigo-400/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/10 text-gray-100 border-gray-400/30';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-500 text-lg">★</span>);
      }
    }
    return stars;
  };

  return (
    <header className="bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Shop Info */}
          <div className="flex-1">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                <span className="text-3xl">🏪</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{shop.name}</h1>
                  <div className="px-4 py-2 rounded-xl bg-linear-to-r from-blue-500/20 to-blue-600/10 border border-blue-400/30 flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="text-white font-bold text-lg">{shop.rating}</span>
                    <span className="text-white/70 text-sm">/5.0</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {getRatingStars(shop.rating)}
                  </div>
                  <span className="text-white/70 text-sm">
                    ({Math.floor(Math.random() * 100) + 50} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-blue-300 text-xl">📍</span>
                  <div>
                    <p className="text-white font-medium">{shop.address}</p>
                    <p className="text-white/60 text-sm">1-2km from your location</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <p className="text-white/80 font-medium">Services Offered</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {shop.services.map((service, index) => (
                  <span 
                    key={index} 
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${getServiceColor(service)}`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/60 text-sm mb-1">🕒 Hours</div>
                <div className="text-white font-medium">{shop.openingHours}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/60 text-sm mb-1">🚚 Delivery</div>
                <div className="text-white font-medium">{shop.deliveryTime || '1-2 hours'}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/60 text-sm mb-1">📞 Contact</div>
                <div className="text-white font-medium">{shop.phone || '+1 (555) 123-4567'}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/60 text-sm mb-1">💰 Min. Order</div>
                <div className="text-white font-medium">₹{shop.minOrder || 99}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto">
            <button 
              className="group relative px-8 py-4 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
              onClick={onCartClick}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-2xl">🛒</span>
                <div className="text-left">
                  <div className="text-lg">View Cart</div>
                  <div className="text-white/80 text-sm">Add items to continue</div>
                </div>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button className="group px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                <span className="text-xl">📞</span>
                <span>Call Shop</span>
              </button>
              <button className="group px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                <span className="text-xl">📍</span>
                <span>Directions</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-400/30">
              <div className="text-white/80 text-sm mb-2">Shop Status</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-medium">Open now</span>
                </div>
                <div className="text-white/70 text-sm">
                  {Math.floor(Math.random() * 100) + 20} orders today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-white/70 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Accepting orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Same-day delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span>Premium quality guarantee</span>
              </div>
            </div>
            <div className="text-white/50">
              Member since {new Date().getFullYear() - Math.floor(Math.random() * 5)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;