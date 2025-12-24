// components/ShopCard.jsx
import React from 'react';

const ShopCard = ({ shop, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{shop.name}</h3>
        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
          ⭐ {shop.rating}
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 mb-3">
        <span className="mr-2">📍</span>
        <span>{shop.distance}</span>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-1">Services Offered:</p>
        <div className="flex flex-wrap gap-1">
          {shop.services.map((service, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <button className="text-blue-600 font-medium hover:text-blue-800">
          View Details →
        </button>
        <span className="text-sm text-gray-500">Open now</span>
      </div>
    </div>
  );
};

export default ShopCard;