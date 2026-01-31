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
    // ✅ Main Container: White background, Slate border, Shadow
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Filter Options</h3>
          <p className="text-slate-500">Refine your search with these filters</p>
        </div>
        {(selectedService || selectedCategory || selectedItem) && (
          <button
            className="px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold hover:bg-slate-200 transition-all duration-300 text-sm"
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

      {/* 1. Services Dropdown */}
      <div className="mb-4">
        <button
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
             expandedSection === 'service' 
             ? 'bg-blue-50 border-blue-200' 
             : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
          onClick={() => toggleSection('service')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
              🧺
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-slate-800">Service Type</h4>
              <p className="text-slate-500 text-sm">
                {selectedService || 'Select a laundry service'}
              </p>
            </div>
          </div>
          <span className="text-slate-400 text-xl font-bold">
            {expandedSection === 'service' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'service' && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map(service => (
                <button
                  key={service.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 border ${
                    selectedService === service.name
                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                  onClick={() => {
                    onServiceSelect(service.name === selectedService ? '' : service.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.name}</span>
                    {selectedService === service.name && (
                      <span className="text-blue-600 font-bold">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Categories Dropdown */}
      <div className="mb-4">
        <button
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
            expandedSection === 'category' 
            ? 'bg-green-50 border-green-200' 
            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
          onClick={() => toggleSection('category')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              👕
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-slate-800">Category</h4>
              <p className="text-slate-500 text-sm">
                {selectedCategory || 'Select a category'}
              </p>
            </div>
          </div>
          <span className="text-slate-400 text-xl font-bold">
            {expandedSection === 'category' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'category' && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 border ${
                    selectedCategory === category.name
                    ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                  onClick={() => {
                    onCategorySelect(category.name === selectedCategory ? '' : category.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    {selectedCategory === category.name && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Items Dropdown */}
      <div className="mb-4">
        <button
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
            expandedSection === 'item' 
            ? 'bg-yellow-50 border-yellow-200' 
            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
          onClick={() => toggleSection('item')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
              🏷️
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-slate-800">Specific Item</h4>
              <p className="text-slate-500 text-sm">
                {selectedItem || 'Select a specific item'}
              </p>
            </div>
          </div>
          <span className="text-slate-400 text-xl font-bold">
            {expandedSection === 'item' ? '−' : '+'}
          </span>
        </button>

        {expandedSection === 'item' && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map(item => (
                <button
                  key={item.id}
                  className={`px-4 py-3 rounded-xl text-left transition-all duration-300 border ${
                    selectedItem === item.name
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-700 shadow-sm'
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                  onClick={() => {
                    onItemSelect(item.name === selectedItem ? '' : item.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {selectedItem === item.name && (
                      <span className="text-yellow-600 font-bold">✓</span>
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
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h4 className="font-bold text-lg text-slate-800 mb-4">Active Filters</h4>
          <div className="flex flex-wrap gap-3">
            {selectedService && (
              <div className="px-4 py-2 rounded-full bg-blue-100 border border-blue-200 flex items-center gap-2">
                <span className="text-blue-800 font-medium text-sm">{selectedService}</span>
                <button 
                  onClick={() => onServiceSelect('')}
                  className="ml-1 w-5 h-5 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors text-blue-800 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="px-4 py-2 rounded-full bg-green-100 border border-green-200 flex items-center gap-2">
                <span className="text-green-800 font-medium text-sm">{selectedCategory}</span>
                <button 
                  onClick={() => onCategorySelect('')}
                  className="ml-1 w-5 h-5 rounded-full bg-green-200 hover:bg-green-300 flex items-center justify-center transition-colors text-green-800 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedItem && (
              <div className="px-4 py-2 rounded-full bg-yellow-100 border border-yellow-200 flex items-center gap-2">
                <span className="text-yellow-800 font-medium text-sm">{selectedItem}</span>
                <button 
                  onClick={() => onItemSelect('')}
                  className="ml-1 w-5 h-5 rounded-full bg-yellow-200 hover:bg-yellow-300 flex items-center justify-center transition-colors text-yellow-800 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${selectedService ? 'text-blue-600' : 'text-slate-300'}`}>
            {selectedService ? '1' : '0'}
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Service Selected</p>
        </div>
        <div className="text-center border-l border-slate-200">
          <div className={`text-2xl font-bold mb-1 ${selectedCategory ? 'text-green-600' : 'text-slate-300'}`}>
            {selectedCategory ? '1' : '0'}
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Category Selected</p>
        </div>
        <div className="text-center border-l border-slate-200">
          <div className={`text-2xl font-bold mb-1 ${selectedItem ? 'text-yellow-600' : 'text-slate-300'}`}>
            {selectedItem ? '1' : '0'}
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Item Selected</p>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;