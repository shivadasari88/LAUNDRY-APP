// components/ShopHeader.jsx
import React from 'react';

const ShopHeader = ({ shop, onCartClick }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">{shop.name}</h1>
            <div className="flex items-center mt-2">
              <span className="text-gray-600 mr-4">📍 {shop.address}</span>
              <span className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                ⭐ {shop.rating}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {shop.services.map((service, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">🕒 {shop.openingHours}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              onClick={onCartClick}
            >
              <span className="mr-2">🛒</span>
              View Cart
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Call Shop
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;