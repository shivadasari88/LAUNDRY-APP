// src/components/ItemModal.jsx - Redesigned for batch processing
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with Steps */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Customize {item.name}</h3>
              <div className="flex items-center mt-2 space-x-4">
                <div className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                  Step 1: Upload
                </div>
                <div className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                  Step 2: Group
                </div>
                <div className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                  Step 3: Specify
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Step 1: Upload Images */}
          {step === 1 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Upload Photos of Your Items</h4>
              <p className="text-gray-600 mb-4">
                Upload photos showing multiple items. You'll specify services for each item in the next step.
                <br />
                <strong>Example:</strong> Take a photo of 5 shirts - we'll help you specify 2 for washing, 3 for dry cleaning.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
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
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-gray-600 text-lg">Click to upload photos</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload one or multiple photos showing your items clearly
                  </p>
                  <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </button>
                </label>
              </div>

              {images.length > 0 && (
                <div className="mt-6">
                  <p className="font-medium mb-2">Uploaded Photos ({images.length}):</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <div key={img.id} className="relative">
                        <img 
                          src={img.url} 
                          alt={`Upload ${index + 1}`} 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Next: Specify Items
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Group Information */}
          {step === 2 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Describe This Group</h4>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Group Name *
                  <span className="text-sm text-gray-500 ml-2">(Helps you and the service provider identify)</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 'Office Shirts', 'Party Wear', 'Winter Clothes'"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h5 className="font-semibold mb-2">📋 How this works:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>You'll add each item from your photos one by one</li>
                  <li>For each item, specify: Service, Fabric, Quantity, Special Instructions</li>
                  <li>The service provider will see your photos with your specifications</li>
                  <li>Example: "Shirt 1: Washing, Cotton", "Shirt 2: Dry Cleaning, Silk"</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back to Upload
                </button>
                <button
                  onClick={startSpecification}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Specifying Items
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Specify Items */}
          {step === 3 && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Images */}
                <div>
                  <h4 className="font-semibold mb-3">Your Photos</h4>
                  <div className="space-y-4">
                    {images.map((img, index) => (
                      <div key={img.id} className="border rounded-lg overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={`Group ${index + 1}`} 
                          className="w-full h-48 object-contain bg-gray-100"
                        />
                        <div className="p-3 bg-gray-50">
                          <p className="text-sm">Photo {index + 1}</p>
                          {itemsInGroup.filter(item => item.imageIndex === index).length > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ {itemsInGroup.filter(item => item.imageIndex === index).length} items specified
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Specifications */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">
                      Specify Items ({itemsInGroup.length} added)
                    </h4>
                    <button
                      onClick={addNewItem}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      + Add Item
                    </button>
                  </div>

                  {itemsInGroup.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-4xl mb-2">🛍️</div>
                      <p className="text-gray-600">No items specified yet</p>
                      <p className="text-sm text-gray-500 mt-1">Click "Add Item" to start specifying</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Item Selection Tabs */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {itemsInGroup.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => setCurrentItemIndex(index)}
                            className={`px-3 py-2 rounded-lg ${currentItemIndex === index 
                              ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                              : 'bg-gray-100 hover:bg-gray-200'}`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>

                      {/* Current Item Specification */}
                      {currentItem && (
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-4 flex items-center">
                            <span className="mr-2">🔄</span>
                            Specifying: {currentItem.name}
                            <span className="ml-auto text-sm text-gray-500">
                              Photo {currentItem.imageIndex + 1}
                            </span>
                          </h5>

                          <div className="space-y-4">
                            <div>
                              <label className="block mb-1 font-medium">Service *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {['Washing', 'Dry Cleaning', 'Ironing', 'Washing + Ironing'].map(service => (
                                  <button
                                    key={service}
                                    type="button"
                                    className={`p-3 border rounded-lg ${currentItem.service === service 
                                      ? 'bg-blue-100 border-blue-500 text-blue-700' 
                                      : 'border-gray-300 hover:border-blue-300'}`}
                                    onClick={() => updateCurrentItem('service', service)}
                                  >
                                    {service}
                                    {service === 'Dry Cleaning' && (
                                      <span className="block text-xs text-red-600">+50% price</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">Assign to Photo</label>
                              <select
                                className="w-full p-2 border rounded-lg"
                                value={currentItem.imageIndex}
                                onChange={(e) => updateCurrentItem('imageIndex', parseInt(e.target.value))}
                              >
                                {images.map((img, index) => (
                                  <option key={img.id} value={index}>
                                    Photo {index + 1} - {img.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">Fabric Type</label>
                              <select
                                className="w-full p-2 border rounded-lg"
                                value={currentItem.fabricType}
                                onChange={(e) => updateCurrentItem('fabricType', e.target.value)}
                              >
                                <option value="">Select fabric (optional)</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Silk">Silk</option>
                                <option value="Wool">Wool</option>
                                <option value="Polyester">Polyester</option>
                                <option value="Linen">Linen</option>
                                <option value="Denim">Denim</option>
                                <option value="Delicate">Delicate/Fragile</option>
                              </select>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">Quantity</label>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="w-8 h-8 flex items-center justify-center border rounded-l"
                                  onClick={() => updateCurrentItem('quantity', Math.max(1, currentItem.quantity - 1))}
                                >
                                  -
                                </button>
                                <div className="w-12 h-8 flex items-center justify-center border-t border-b">
                                  {currentItem.quantity}
                                </div>
                                <button
                                  type="button"
                                  className="w-8 h-8 flex items-center justify-center border rounded-r"
                                  onClick={() => updateCurrentItem('quantity', currentItem.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium">
                                Special Instructions
                                <span className="text-sm text-gray-500 ml-2">(Visible to service provider)</span>
                              </label>
                              <textarea
                                className="w-full p-2 border rounded-lg"
                                rows="3"
                                placeholder="e.g., 'Remove stain on collar', 'Handle with care', 'No bleach'"
                                value={currentItem.specialInstructions}
                                onChange={(e) => updateCurrentItem('specialInstructions', e.target.value)}
                              />
                            </div>

                            <div className="pt-4 border-t">
                              <button
                                type="button"
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                onClick={() => {
                                  setItemsInGroup(prev => prev.filter((_, idx) => idx !== currentItemIndex));
                                  setCurrentItemIndex(Math.max(0, currentItemIndex - 1));
                                }}
                              >
                                Remove This Item
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  {itemsInGroup.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold mb-2">Group Summary</h5>
                      <div className="text-sm space-y-1">
                        <p>• {itemsInGroup.length} items specified in "{groupName}"</p>
                        <p>• Services: {[...new Set(itemsInGroup.map(i => i.service))].join(', ')}</p>
                        <p>• Total quantity: {itemsInGroup.reduce((sum, item) => sum + item.quantity, 0)} pieces</p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ← Back to Group
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={itemsInGroup.length === 0}
                    >
                      Add Group to Cart ({itemsInGroup.length} items)
                    </button>
                  </div>
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