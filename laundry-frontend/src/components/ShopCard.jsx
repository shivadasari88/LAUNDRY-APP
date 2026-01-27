import React from 'react';

const ShopCard = ({ shop, onClick }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500/30 to-emerald-600/20 text-green-100 border-green-400/40';
    if (rating >= 4.0) return 'from-yellow-500/30 to-amber-600/20 text-yellow-100 border-yellow-400/40';
    if (rating >= 3.0) return 'from-orange-500/30 to-orange-600/20 text-orange-100 border-orange-400/40';
    return 'from-red-500/30 to-red-600/20 text-red-100 border-red-400/40';
  };

  const getDistanceColor = (distance) => {
    const km = parseFloat(distance);
    if (km <= 1) return 'text-green-400 bg-green-500/20 border-green-400/30';
    if (km <= 2) return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
    return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
  };

  const getServiceColor = (service) => {
    switch(service) {
      case 'Washing': return 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-100 border-blue-400/30';
      case 'Dry Cleaning': return 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-100 border-purple-400/30';
      case 'Ironing': return 'bg-gradient-to-r from-orange-500/20 to-amber-600/10 text-orange-100 border-orange-400/30';
      case 'Washing + Ironing': return 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 text-indigo-100 border-indigo-400/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/10 text-gray-100 border-gray-400/30';
    }
  };

  return (
    <div 
      className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-indigo-600/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-600/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
      
      {/* Premium Badge */}
      {shop.rating >= 4.5 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500/30 to-amber-600/30 border border-yellow-400/50 backdrop-blur-sm">
            <span className="text-xs font-bold text-yellow-200 flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              Premium
            </span>
          </div>
        </div>
      )}

      {/* Shop Header */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/30 backdrop-blur-sm">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">{shop.name}</h3>
          </div>
        </div>
      </div>

      {/* Rating and Distance */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className={`px-4 py-2 rounded-xl bg-linear-to-r ${getRatingColor(shop.rating)} border flex items-center gap-2`}>
          <span className="text-lg">⭐</span>
          <span className="font-bold text-lg">{shop.rating}</span>
          <span className="text-white/70 text-sm">/5.0</span>
        </div>
        <div className={`px-4 py-2 rounded-xl ${getDistanceColor(shop.distance)} border flex items-center gap-2 backdrop-blur-sm`}>
          <span className="text-lg">📍</span>
          <span className="font-medium">{shop.distance}</span>
        </div>
      </div>

      {/* Services Offered */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
          <p className="text-white/80 font-medium">Services Offered</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {shop.services.map((service, index) => (
            <span 
              key={index} 
              className={`px-3 py-2 text-sm font-medium rounded-lg border ${getServiceColor(service)} transition-transform group-hover:scale-105`}
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-xs text-white/50 mb-1">Delivery Time</div>
          <div className="text-white font-medium">{shop.deliveryTime || '1-2 hours'}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-xs text-white/50 mb-1">Min. Order</div>
          <div className="text-white font-medium">₹{shop.minOrder || 99}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center">
          <button className="group flex items-center gap-2 text-white font-medium hover:text-blue-200 transition-colors">
            <span className="text-lg">👉</span>
            <span>View Details</span>
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Open now</span>
          </div>
        </div>
      </div>

      {/* Click Hint */}
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1 text-xs text-white/50">
          <span className="animate-bounce">👇</span>
          <span>Click to explore</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;