import React from 'react';

const ItemList = ({ items, onItemSelect }) => {

  const getServiceIcon = (serviceTypes = []) => {
    if (serviceTypes.includes('Dry Cleaning')) return '🧼';
    if (serviceTypes.includes('Ironing')) return '♨️';
    return '🧺';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Men': return 'from-blue-500/30 via-blue-600/20 to-blue-700/10 text-blue-100 border-blue-400/40';
      case 'Women': return 'from-pink-500/30 via-pink-600/20 to-purple-700/10 text-pink-100 border-pink-400/40';
      case 'Kids': return 'from-yellow-500/30 via-yellow-600/20 to-amber-700/10 text-yellow-100 border-yellow-400/40';
      case 'Home': return 'from-green-500/30 via-green-600/20 to-emerald-700/10 text-green-100 border-green-400/40';
      default: return 'from-gray-500/30 via-gray-600/20 to-gray-700/10 text-gray-100 border-gray-400/40';
    }
  };

  const getServiceColor = (service) => {
    switch (service) {
      case 'Dry Cleaning': return 'bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-100 border-red-400/30';
      case 'Ironing': return 'bg-gradient-to-r from-orange-500/20 to-amber-600/10 text-orange-100 border-orange-400/30';
      case 'Washing': return 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-100 border-blue-400/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/10 text-gray-100 border-gray-400/30';
    }
  };

  const getServiceEmoji = (service) => {
    switch (service) {
      case 'Dry Cleaning': return '🧼';
      case 'Ironing': return '♨️';
      case 'Washing': return '🧺';
      default: return '🔧';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => {

        // ✅ NORMALIZATION (single source of truth)
        const itemName = item.name || item.itemName || 'Item';
        const category =
          typeof item.category === 'string'
            ? item.category
            : item.category?.name || 'General';

        const serviceTypes = item.serviceTypes
          ? item.serviceTypes
          : item.serviceType
            ? [item.serviceType.name]
            : [];

        return (
          <div
            key={item.id}
            onClick={() => onItemSelect({
              ...item,
              name: itemName,
              category,
              serviceTypes
            })}
            className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 cursor-pointer"
          >

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <span className="text-3xl">{getServiceIcon(serviceTypes)}</span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {itemName}
                </h3>
                <span className={`px-4 py-1.5 text-sm rounded-xl bg-linear-to-r ${getCategoryColor(category)} border`}>
                  {category}
                </span>
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-6">
              {serviceTypes.map((service, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 text-sm rounded-lg border flex items-center gap-2 ${getServiceColor(service)}`}
                >
                  {getServiceEmoji(service)} {service}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-white">
              ₹{item.price}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
