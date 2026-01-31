import React from 'react';

const ShopCard = ({ shop, onClick }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-50 text-green-700 border-green-200';
    if (rating >= 4.0) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (rating >= 3.0) return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const getServiceColor = (service) => {
    switch (service) {
      case 'Washing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Dry Cleaning': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Ironing': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div
      className="group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center border border-cyan-100 text-2xl">
            🏪
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
              {shop.name}
            </h3>
            <p className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded-md mt-1">
              {shop.approvalStatus === 'APPROVED' ? 'Verified Shop' : 'New'}
            </p>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="flex items-center justify-between mb-6">
        <div className={`px-3 py-1 rounded-lg border flex items-center gap-1 ${getRatingColor(shop.rating)}`}>
          <span className="text-xs">⭐</span>
          <span className="font-bold text-sm">{shop.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <span>📍</span>
          <span>{shop.distance || "1.2 km"}</span>
        </div>
      </div>

      {/* Services Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {shop.services && shop.services.length > 0 ? (
            shop.services.slice(0, 3).map((service, index) => (
              <span key={index} className={`px-2 py-1 text-[10px] font-bold rounded-md border ${getServiceColor(service)}`}>
                {service}
              </span>
            ))
          ) : <span className="text-xs text-slate-400">Services N/A</span>}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto grid grid-cols-2 gap-2 text-center">
        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase">Delivery</div>
          <div className="text-sm font-bold text-slate-700">24 Hrs</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase">Min Order</div>
          <div className="text-sm font-bold text-slate-700">₹{shop.minOrder || 99}</div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;