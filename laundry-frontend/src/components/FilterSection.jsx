// components/FilterSection.jsx
import React from 'react';

const FilterSection = ({
  services,
  categories,
  items,
  selectedService,
  selectedCategory,
  selectedItem,
  onServiceSelect,
  onCategorySelect,
  onItemSelect
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold text-lg mb-4">Filter Shops</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Select Service</h4>
        <div className="flex flex-wrap gap-2">
          {services.map(service => (
            <button
              key={service.id}
              className={`px-4 py-2 rounded-full border ${selectedService === service.name ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-100'}`}
              onClick={() => onServiceSelect(service.name === selectedService ? '' : service.name)}
            >
              <span className="mr-2">{service.icon}</span>
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Select Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full border ${selectedCategory === category.name ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-100'}`}
              onClick={() => onCategorySelect(category.name === selectedCategory ? '' : category.name)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Select Items (Optional)</h4>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item.id}
              className={`px-4 py-2 rounded-full border ${selectedItem === item.name ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'bg-gray-100'}`}
              onClick={() => onItemSelect(item.name === selectedItem ? '' : item.name)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {(selectedService || selectedCategory || selectedItem) && (
        <div className="mt-4 pt-4 border-t">
          <button
            className="text-red-500 text-sm"
            onClick={() => {
              onServiceSelect('');
              onCategorySelect('');
              onItemSelect('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;