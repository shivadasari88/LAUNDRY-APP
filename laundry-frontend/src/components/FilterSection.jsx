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
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Filter Shops</h3>
          <p className="text-white/70">Refine your search to find the perfect laundry service</p>
        </div>
        {(selectedService || selectedCategory || selectedItem) && (
          <button
            className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            onClick={() => {
              onServiceSelect('');
              onCategorySelect('');
              onItemSelect('');
            }}
          >
            <span>↺</span>
            Clear All Filters
          </button>
        )}
      </div>
      
      {/* Services Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-blue-500/30 to-blue-600/30 flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
            <span className="text-2xl">🧺</span>
          </div>
          <div>
            <h4 className="font-bold text-xl text-white">Select Service</h4>
            <p className="text-white/60 text-sm">Choose the type of laundry service you need</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {services.map(service => (
            <button
              key={service.id}
              className={`group flex items-center px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedService === service.name 
                ? 'bg-linear-to-r from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 transform scale-105' 
                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]'
              }`}
              onClick={() => onServiceSelect(service.name === selectedService ? '' : service.name)}
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{service.icon}</span>
              <span className="font-semibold text-lg">{service.name}</span>
              {selectedService === service.name && (
                <span className="ml-3 text-sm px-2 py-1 bg-white/20 rounded-full">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-green-500/30 to-green-600/30 flex items-center justify-center backdrop-blur-sm border border-green-400/30">
            <span className="text-2xl">👕</span>
          </div>
          <div>
            <h4 className="font-bold text-xl text-white">Select Category</h4>
            <p className="text-white/60 text-sm">Filter by clothing or item category</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              className={`group flex items-center px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === category.name 
                ? 'bg-linear-to-r from-green-500 to-green-600 border-green-400 text-white shadow-lg shadow-green-500/30 transform scale-105' 
                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]'
              }`}
              onClick={() => onCategorySelect(category.name === selectedCategory ? '' : category.name)}
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{category.icon}</span>
              <span className="font-semibold text-lg">{category.name}</span>
              {selectedCategory === category.name && (
                <span className="ml-3 text-sm px-2 py-1 bg-white/20 rounded-full">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Items Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-yellow-500/30 to-yellow-600/30 flex items-center justify-center backdrop-blur-sm border border-yellow-400/30">
            <span className="text-2xl">🏷️</span>
          </div>
          <div>
            <h4 className="font-bold text-xl text-white">Specific Items (Optional)</h4>
            <p className="text-white/60 text-sm">Looking for something specific?</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {items.map(item => (
            <button
              key={item.id}
              className={`group flex items-center px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedItem === item.name 
                ? 'bg-linear-to-r from-yellow-500 to-yellow-600 border-yellow-400 text-white shadow-lg shadow-yellow-500/30 transform scale-105' 
                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]'
              }`}
              onClick={() => onItemSelect(item.name === selectedItem ? '' : item.name)}
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-semibold text-lg">{item.name}</span>
              {selectedItem === item.name && (
                <span className="ml-3 text-sm px-2 py-1 bg-white/20 rounded-full">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedService || selectedCategory || selectedItem) && (
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
              <span className="text-white">✓</span>
            </div>
            <h4 className="font-semibold text-lg text-white">Active Filters</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedService && (
              <div className="px-5 py-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center gap-3 group">
                <span className="text-xl">🧺</span>
                <span className="text-blue-100 font-medium">{selectedService}</span>
                <button 
                  onClick={() => onServiceSelect('')}
                  className="ml-2 w-7 h-7 rounded-full bg-blue-500/40 hover:bg-blue-500/60 flex items-center justify-center transition-colors group-hover:scale-110"
                >
                  <span className="text-white text-sm">✕</span>
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="px-5 py-3 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center gap-3 group">
                <span className="text-xl">{categories.find(c => c.name === selectedCategory)?.icon}</span>
                <span className="text-green-100 font-medium">{selectedCategory}</span>
                <button 
                  onClick={() => onCategorySelect('')}
                  className="ml-2 w-7 h-7 rounded-full bg-green-500/40 hover:bg-green-500/60 flex items-center justify-center transition-colors group-hover:scale-110"
                >
                  <span className="text-white text-sm">✕</span>
                </button>
              </div>
            )}
            {selectedItem && (
              <div className="px-5 py-3 rounded-2xl bg-yellow-500/20 border border-yellow-400/30 flex items-center gap-3 group">
                <span className="text-xl">{items.find(i => i.name === selectedItem)?.icon}</span>
                <span className="text-yellow-100 font-medium">{selectedItem}</span>
                <button 
                  onClick={() => onItemSelect('')}
                  className="ml-2 w-7 h-7 rounded-full bg-yellow-500/40 hover:bg-yellow-500/60 flex items-center justify-center transition-colors group-hover:scale-110"
                >
                  <span className="text-white text-sm">✕</span>
                </button>
              </div>
            )}
          </div>
          <p className="text-white/70 text-sm mt-4">
            Showing shops that match your {[
              selectedService && "service",
              selectedCategory && "category", 
              selectedItem && "item"
            ].filter(Boolean).join(" and ")} criteria
          </p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {services.length}
          </div>
          <p className="text-white/60 text-sm">Services Available</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {categories.length}
          </div>
          <p className="text-white/60 text-sm">Categories</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {items.length}
          </div>
          <p className="text-white/60 text-sm">Specific Items</p>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <p className="text-white/80 text-sm">
              <strong className="text-white">Pro Tip:</strong> Start with selecting a service type, then narrow down by category or specific items for the best results. You can combine multiple filters to find shops that match all your criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;