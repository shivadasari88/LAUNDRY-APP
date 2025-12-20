// components/ItemList.jsx
import React from 'react';

const ItemList = ({ items, onItemSelect }) => {
  const getServiceIcon = (serviceTypes) => {
    if (serviceTypes.includes('Dry Cleaning')) return '🧼';
    if (serviceTypes.includes('Ironing')) return '♨️';
    return '🧺';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div 
          key={item.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onItemSelect(item)}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.category === 'Men' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'Women' ? 'bg-pink-100 text-pink-800' :
                  item.category === 'Kids' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.category}
                </span>
              </div>
            </div>
            <div className="text-2xl">
              {getServiceIcon(item.serviceTypes)}
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600">Available Services:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.serviceTypes.map((service, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-lg font-bold text-blue-700">
              ₹{item.price}
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Click to customize service & quantity
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;