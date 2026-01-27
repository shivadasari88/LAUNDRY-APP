import { useState } from 'react';

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
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Filter Options</h3>
          <p className="text-white/70">Refine your search with these filters</p>
        </div>
        {(selectedService || selectedCategory || selectedItem) && (
          <button
            className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
            onClick={() => {
              onServiceSelect('');
              onCategorySelect('');
              onItemSelect('');
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Services Dropdown */}
      <div className="mb-6">
        <button
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          onClick={() => toggleSection('service')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="text-white">🧺</span>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-white">Service Type</h4>
              <p className="text-white/60 text-sm">
                {selectedService || 'Select a laundry service'}
              </p>
            </div>
          </div>
          <span className="text-white/70 text-xl transition-transform duration-300">
            {expandedSection === 'service' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'service' && (
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map(service => (
                <button
                  key={service.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    selectedService === service.name
                    ? 'bg-blue-500/30 border border-blue-400/50 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/90'
                  }`}
                  onClick={() => {
                    onServiceSelect(service.name === selectedService ? '' : service.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.name}</span>
                    {selectedService === service.name && (
                      <span className="text-blue-300">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories Dropdown */}
      <div className="mb-6">
        <button
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          onClick={() => toggleSection('category')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="text-white">👕</span>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-white">Category</h4>
              <p className="text-white/60 text-sm">
                {selectedCategory || 'Select a category'}
              </p>
            </div>
          </div>
          <span className="text-white/70 text-xl transition-transform duration-300">
            {expandedSection === 'category' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'category' && (
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    selectedCategory === category.name
                    ? 'bg-green-500/30 border border-green-400/50 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/90'
                  }`}
                  onClick={() => {
                    onCategorySelect(category.name === selectedCategory ? '' : category.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    {selectedCategory === category.name && (
                      <span className="text-green-300">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items Dropdown */}
      <div className="mb-6">
        <button
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          onClick={() => toggleSection('item')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <span className="text-white">🏷️</span>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-white">Specific Item</h4>
              <p className="text-white/60 text-sm">
                {selectedItem || 'Select a specific item'}
              </p>
            </div>
          </div>
          <span className="text-white/70 text-xl transition-transform duration-300">
            {expandedSection === 'item' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'item' && (
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map(item => (
                <button
                  key={item.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    selectedItem === item.name
                    ? 'bg-yellow-500/30 border border-yellow-400/50 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/90'
                  }`}
                  onClick={() => {
                    onItemSelect(item.name === selectedItem ? '' : item.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {selectedItem === item.name && (
                      <span className="text-yellow-300">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(selectedService || selectedCategory || selectedItem) && (
        <div className="mt-8 pt-6 border-t border-white/20">
          <h4 className="font-semibold text-lg text-white mb-4">Active Filters</h4>
          <div className="flex flex-wrap gap-3">
            {selectedService && (
              <div className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center gap-2">
                <span className="text-blue-100 font-medium">{selectedService}</span>
                <button 
                  onClick={() => onServiceSelect('')}
                  className="ml-1 w-6 h-6 rounded-full bg-blue-500/40 hover:bg-blue-500/60 flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xs">✕</span>
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-400/30 flex items-center gap-2">
                <span className="text-green-100 font-medium">{selectedCategory}</span>
                <button 
                  onClick={() => onCategorySelect('')}
                  className="ml-1 w-6 h-6 rounded-full bg-green-500/40 hover:bg-green-500/60 flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xs">✕</span>
                </button>
              </div>
            )}
            {selectedItem && (
              <div className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-400/30 flex items-center gap-2">
                <span className="text-yellow-100 font-medium">{selectedItem}</span>
                <button 
                  onClick={() => onItemSelect('')}
                  className="ml-1 w-6 h-6 rounded-full bg-yellow-500/40 hover:bg-yellow-500/60 flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xs">✕</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {selectedService ? '1' : '0'}
          </div>
          <p className="text-white/60 text-sm">Service Selected</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {selectedCategory ? '1' : '0'}
          </div>
          <p className="text-white/60 text-sm">Category Selected</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {selectedItem ? '1' : '0'}
          </div>
          <p className="text-white/60 text-sm">Item Selected</p>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;