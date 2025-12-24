import React from 'react';

const ItemList = ({ items, onItemSelect }) => {
  const getServiceIcon = (serviceTypes) => {
    if (serviceTypes.includes('Dry Cleaning')) return '🧼';
    if (serviceTypes.includes('Ironing')) return '♨️';
    return '🧺';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Men': return 'from-blue-500/30 via-blue-600/20 to-blue-700/10 text-blue-100 border-blue-400/40';
      case 'Women': return 'from-pink-500/30 via-pink-600/20 to-purple-700/10 text-pink-100 border-pink-400/40';
      case 'Kids': return 'from-yellow-500/30 via-yellow-600/20 to-amber-700/10 text-yellow-100 border-yellow-400/40';
      case 'Home': return 'from-green-500/30 via-green-600/20 to-emerald-700/10 text-green-100 border-green-400/40';
      default: return 'from-gray-500/30 via-gray-600/20 to-gray-700/10 text-gray-100 border-gray-400/40';
    }
  };

  const getServiceColor = (service) => {
    switch(service) {
      case 'Dry Cleaning': return 'bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-100 border-red-400/30';
      case 'Ironing': return 'bg-gradient-to-r from-orange-500/20 to-amber-600/10 text-orange-100 border-orange-400/30';
      case 'Washing': return 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-100 border-blue-400/30';
      case 'Washing + Ironing': return 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-100 border-purple-400/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/10 text-gray-100 border-gray-400/30';
    }
  };

  const getServiceEmoji = (service) => {
    switch(service) {
      case 'Dry Cleaning': return '🧼';
      case 'Ironing': return '♨️';
      case 'Washing': return '🧺';
      case 'Washing + Ironing': return '🧺♨️';
      default: return '🔧';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <div 
          key={item.id}
          className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2 overflow-hidden"
          onClick={() => onItemSelect(item)}
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-600/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-blue-600/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
          
          {/* Popular Badge */}
          {item.popular && (
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500/30 to-amber-600/30 border border-yellow-400/50 backdrop-blur-sm">
                <span className="text-xs font-bold text-yellow-200 flex items-center gap-1">
                  <span className="text-yellow-400">🔥</span>
                  Popular
                </span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="relative z-10 flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-white/20 to-white/5 flex items-center justify-center border border-white/30 backdrop-blur-sm">
              <span className="text-3xl">{getServiceIcon(item.serviceTypes)}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{item.name}</h3>
              <span className={`px-4 py-1.5 text-sm font-medium rounded-xl bg-linear-to-r ${getCategoryColor(item.category)} border`}>
                {item.category}
              </span>
            </div>
          </div>
          
          {/* Services List */}
          <div className="relative z-10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              <p className="text-white/80 text-sm font-medium">Available Services</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.serviceTypes.map((service, index) => (
                <span 
                  key={index} 
                  className={`px-3 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 ${getServiceColor(service)} transition-transform group-hover:scale-105`}
                >
                  <span className="text-base">{getServiceEmoji(service)}</span>
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          {/* Pricing */}
          <div className="relative z-10 mb-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">Price per piece</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">₹{item.price}</span>
                  <span className="text-white/60 text-sm ml-1">/piece</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/50 mb-1">Est. Delivery</div>
                <div className="text-white font-medium">1-2 days</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <button className="w-full group relative px-6 py-4 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-xl">🛒</span>
                <span className="text-lg">Add to Cart</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
              </div>
            </button>
          </div>
          
          {/* Quick Info */}
          <div className="relative z-10 mt-4 flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Available for all services</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>4.5+</span>
            </div>
          </div>

          {/* Click Hint */}
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-xs text-white/50">
              <span className="animate-bounce">👇</span>
              <span>Click to customize</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;