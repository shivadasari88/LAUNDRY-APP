import { useState, useRef } from 'react';

const ItemModal = ({ item, onClose, onAddToCart }) => {
  const [step, setStep] = useState(1); // 1: Upload, 2: Specify, 3: Review
  const [images, setImages] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [itemsInGroup, setItemsInGroup] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const fileInputRef = useRef(null);

  // Step 1: Upload Images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      items: [],
      name: file.name
    }));
    setImages(prev => [...prev, ...imageUrls]);
    
    // Auto-proceed to step 2 if images uploaded
    if (files.length > 0) {
      setTimeout(() => setStep(2), 500);
    }
  };

  // Step 2: Specify services for items in images
  const startSpecification = () => {
    if (!groupName.trim()) {
      alert('Please give this group a name (e.g., "My Shirts", "Office Wear")');
      return;
    }
    
    // Initialize items array
    const items = [];
    setItemsInGroup(items);
    setStep(3);
  };

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      name: `${item.name} ${itemsInGroup.length + 1}`,
      service: 'Washing', // Default
      fabricType: '',
      quantity: 1,
      specialInstructions: '',
      imageIndex: 0, // Which image this item belongs to
      boundingBox: null, // For future: drawing boxes on image
    };
    setItemsInGroup(prev => [...prev, newItem]);
    setCurrentItemIndex(itemsInGroup.length);
  };

  const updateCurrentItem = (field, value) => {
    setItemsInGroup(prev => {
      const updated = [...prev];
      if (updated[currentItemIndex]) {
        updated[currentItemIndex] = { ...updated[currentItemIndex], [field]: value };
      }
      return updated;
    });
  };

  const handleAddToCart = () => {
    if (itemsInGroup.length === 0) {
      alert('Please add at least one item specification');
      return;
    }

    // Group all items with their specifications
    const groupData = {
      id: Date.now(),
      groupName,
      baseItem: item,
      images,
      items: itemsInGroup,
      totalQuantity: itemsInGroup.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: itemsInGroup.reduce((sum, item) => {
        const servicePrice = item.service === 'Dry Cleaning' ? item.price * 1.5 : item.price;
        return sum + (servicePrice * item.quantity);
      }, 0)
    };

    onAddToCart(groupData);
  };

  const currentItem = itemsInGroup[currentItemIndex];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg px-8 py-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">Customize {item.name}</h3>
              <p className="text-white/70 mt-1">Upload photos & specify services for each item</p>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-6 gap-2">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  stepNum < step 
                    ? 'bg-green-500/20 border-green-400 text-green-300' 
                    : stepNum === step 
                    ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/50' 
                    : 'bg-white/10 border-white/20 text-white/50'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-500 ${
                    stepNum < step ? 'bg-green-400' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
            <div className="ml-6 text-white/70 text-sm">
              {step === 1 && '📸 Upload Photos'}
              {step === 2 && '🏷️ Name Group'}
              {step === 3 && '🛍️ Specify Items'}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Upload Images */}
          {step === 1 && (
            <div className="mb-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📸</div>
                <h4 className="text-2xl font-bold text-white mb-2">Upload Photos of Your Items</h4>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Take clear photos showing all items. You'll specify services for each item in the next steps.
                </p>
              </div>
              
              <div className="border-2 border-dashed border-white/30 rounded-3xl p-12 text-center hover:border-blue-400/50 transition-all duration-300 bg-white/5 backdrop-blur-sm">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <div className="text-7xl mb-6 animate-pulse">⬆️</div>
                  <p className="text-white text-xl font-medium mb-2">Click or drag to upload</p>
                  <p className="text-white/70 text-sm mb-6">
                    Upload one or multiple photos showing your items clearly
                    <br />
                    Supported: JPG, PNG, WEBP • Max 10MB each
                  </p>
                  <button
                    type="button"
                    className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </button>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {images.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold text-white">Uploaded Photos ({images.length})</h5>
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
                    >
                      Next Step
                      <span>→</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div key={img.id} className="relative group">
                        <img 
                          src={img.url} 
                          alt={`Upload ${index + 1}`} 
                          className="w-full h-48 object-cover rounded-2xl border-2 border-white/20 group-hover:border-blue-400/50 transition-all duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                          {index + 1}
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-3">
                          <p className="text-white text-sm truncate">{img.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-8 bg-blue-500/10 rounded-2xl p-6 border border-blue-400/30">
                <h6 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-300">💡</span>
                  Tips for Best Results
                </h6>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Take photos in good lighting against a plain background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Spread items out so each piece is clearly visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Show any stains, damages, or special areas that need attention</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Group Information */}
          {step === 2 && (
            <div className="mb-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏷️</div>
                <h4 className="text-2xl font-bold text-white mb-2">Describe Your Group</h4>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Give your group a descriptive name to help both you and the service provider identify these items.
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <label className="block mb-3 font-medium text-white text-lg">
                    Group Name *
                    <span className="text-white/60 text-sm ml-2">(e.g., "Office Shirts", "Party Wear", "Winter Clothes")</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter a descriptive name for this group..."
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>

                <div className="bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-white/20 mb-8">
                  <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-blue-300">📋</span>
                    How Batch Processing Works
                  </h5>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
                        <span className="text-blue-300">1</span>
                      </div>
                      <span>You'll add each item from your photos one by one</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
                        <span className="text-blue-300">2</span>
                      </div>
                      <span>For each item, specify: Service, Fabric, Quantity, Special Instructions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
                        <span className="text-blue-300">3</span>
                      </div>
                      <span>The service provider will see your photos with your specifications</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    ← Back to Upload
                  </button>
                  <button
                    onClick={startSpecification}
                    className="flex-1 py-3 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={!groupName.trim()}
                  >
                    Start Specifying Items
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Specify Items */}
          {step === 3 && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Images */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-blue-300">🖼️</span>
                    Your Photos
                  </h4>
                  <div className="space-y-6">
                    {images.map((img, index) => (
                      <div key={img.id} className="relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-blue-400/50 transition-all duration-300">
                        <img 
                          src={img.url} 
                          alt={`Group ${index + 1}`} 
                          className="w-full h-56 object-cover bg-linear-to-r from-gray-900 to-slate-800"
                        />
                        <div className="p-4 bg-linear-to-r from-white/5 to-white/10 backdrop-blur-sm">
                          <div className="flex justify-between items-center">
                            <p className="text-white font-medium">Photo {index + 1}</p>
                            {itemsInGroup.filter(item => item.imageIndex === index).length > 0 && (
                              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                                ✓ {itemsInGroup.filter(item => item.imageIndex === index).length} items
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Specifications */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-blue-300">🛍️</span>
                        Specify Items
                      </h4>
                      <p className="text-white/70 text-sm">
                        {itemsInGroup.length} items in "{groupName}"
                      </p>
                    </div>
                    <button
                      onClick={addNewItem}
                      className="px-5 py-2.5 rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
                    >
                      + Add Item
                    </button>
                  </div>

                  {itemsInGroup.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-white/30 rounded-2xl bg-white/5 backdrop-blur-sm">
                      <div className="text-6xl mb-4">🛍️</div>
                      <p className="text-white text-lg font-medium mb-2">No items specified yet</p>
                      <p className="text-white/70 mb-6">Click "Add Item" to start specifying services</p>
                    </div>
                  ) : (
                    <>
                      {/* Item Selection Tabs */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {itemsInGroup.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => setCurrentItemIndex(index)}
                            className={`px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                              currentItemIndex === index 
                              ? 'bg-linear-to-r from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg' 
                              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>

                      {/* Current Item Specification */}
                      {currentItem && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
                          <h5 className="font-bold text-white mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <span className="text-blue-300">🔄</span>
                              {currentItem.name}
                            </span>
                            <span className="text-sm text-white/50">
                              Photo {currentItem.imageIndex + 1}
                            </span>
                          </h5>

                          <div className="space-y-6">
                            {/* Service Selection */}
                            <div>
                              <label className="block mb-3 font-medium text-white">Service Type *</label>
                              <div className="grid grid-cols-2 gap-3">
                                {['Washing', 'Dry Cleaning', 'Ironing', 'Washing + Ironing'].map(service => (
                                  <button
                                    key={service}
                                    type="button"
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                      currentItem.service === service 
                                      ? 'bg-linear-to-r from-blue-500/30 to-blue-600/20 border-blue-400 text-white' 
                                      : 'border-white/20 text-white/80 hover:border-blue-400/50 hover:bg-white/10'
                                    }`}
                                    onClick={() => updateCurrentItem('service', service)}
                                  >
                                    <div className="text-lg mb-1">{service}</div>
                                    {service === 'Dry Cleaning' && (
                                      <div className="text-sm text-red-300 font-medium">+50% price</div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Assign to Photo */}
                              <div>
                                <label className="block mb-2 font-medium text-white">Assign to Photo</label>
                                <select
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                  value={currentItem.imageIndex}
                                  onChange={(e) => updateCurrentItem('imageIndex', parseInt(e.target.value))}
                                >
                                  {images.map((img, index) => (
                                    <option key={img.id} value={index} className="bg-gray-900">
                                      Photo {index + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Fabric Type */}
                              <div>
                                <label className="block mb-2 font-medium text-white">Fabric Type</label>
                                <select
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                  value={currentItem.fabricType}
                                  onChange={(e) => updateCurrentItem('fabricType', e.target.value)}
                                >
                                  <option value="" className="bg-gray-900">Select fabric (optional)</option>
                                  <option value="Cotton" className="bg-gray-900">Cotton</option>
                                  <option value="Silk" className="bg-gray-900">Silk</option>
                                  <option value="Wool" className="bg-gray-900">Wool</option>
                                  <option value="Polyester" className="bg-gray-900">Polyester</option>
                                  <option value="Linen" className="bg-gray-900">Linen</option>
                                  <option value="Denim" className="bg-gray-900">Denim</option>
                                  <option value="Delicate" className="bg-gray-900">Delicate/Fragile</option>
                                </select>
                              </div>
                            </div>

                            {/* Quantity */}
                            <div>
                              <label className="block mb-2 font-medium text-white">Quantity</label>
                              <div className="flex items-center max-w-48">
                                <button
                                  type="button"
                                  className="w-12 h-12 flex items-center justify-center border border-white/30 rounded-l-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                  onClick={() => updateCurrentItem('quantity', Math.max(1, currentItem.quantity - 1))}
                                >
                                  -
                                </button>
                                <div className="w-16 h-12 flex items-center justify-center border-y border-white/30 bg-white/5">
                                  <span className="text-white font-bold text-lg">{currentItem.quantity}</span>
                                </div>
                                <button
                                  type="button"
                                  className="w-12 h-12 flex items-center justify-center border border-white/30 rounded-r-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                  onClick={() => updateCurrentItem('quantity', currentItem.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Special Instructions */}
                            <div>
                              <label className="block mb-2 font-medium text-white">
                                Special Instructions
                                <span className="text-white/60 text-sm ml-2">(Visible to service provider)</span>
                              </label>
                              <textarea
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                rows="3"
                                placeholder="e.g., 'Remove stain on collar', 'Handle with care', 'No bleach', 'Gentle cycle only'"
                                value={currentItem.specialInstructions}
                                onChange={(e) => updateCurrentItem('specialInstructions', e.target.value)}
                              />
                            </div>

                            {/* Remove Button */}
                            <div className="pt-4 border-t border-white/10">
                              <button
                                type="button"
                                className="px-5 py-2.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
                                onClick={() => {
                                  setItemsInGroup(prev => prev.filter((_, idx) => idx !== currentItemIndex));
                                  setCurrentItemIndex(Math.max(0, currentItemIndex - 1));
                                }}
                              >
                                🗑️ Remove This Item
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Summary */}
                      {itemsInGroup.length > 0 && (
                        <div className="bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-white/20 mb-6">
                          <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-blue-300">📊</span>
                            Group Summary
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">{itemsInGroup.length}</div>
                              <div className="text-white/70 text-sm">Items</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">
                                {itemsInGroup.reduce((sum, item) => sum + item.quantity, 0)}
                              </div>
                              <div className="text-white/70 text-sm">Total Pieces</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">
                                {[...new Set(itemsInGroup.map(i => i.service))].length}
                              </div>
                              <div className="text-white/70 text-sm">Services</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">
                                ₹{itemsInGroup.reduce((sum, item) => {
                                  const servicePrice = item.service === 'Dry Cleaning' ? item.price * 1.5 : item.price;
                                  return sum + (servicePrice * item.quantity);
                                }, 0)}
                              </div>
                              <div className="text-white/70 text-sm">Est. Total</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(2)}
                          className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                        >
                          ← Back to Group
                        </button>
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 py-3 rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          disabled={itemsInGroup.length === 0}
                        >
                          🛒 Add to Cart ({itemsInGroup.length} items)
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;