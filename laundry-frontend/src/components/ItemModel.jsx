import { useState, useRef } from 'react';

const ItemModal = ({ item, onClose, onAddToCart }) => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [itemsInGroup, setItemsInGroup] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const fileInputRef = useRef(null);

  // ... (Keep handleImageUpload, startSpecification exactly as you have them) ...
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      items: [],
      name: file.name
    }));
    setImages(prev => [...prev, ...imageUrls]);
    if (files.length > 0) setTimeout(() => setStep(2), 500);
  };

  const startSpecification = () => {
    if (!groupName.trim()) {
      alert('Please give this group a name');
      return;
    }
    setItemsInGroup([]);
    setStep(3);
  };

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      name: `${item.name} ${itemsInGroup.length + 1}`,
      service: 'Washing',
      fabricType: 'Cotton',
      quantity: 1,
      specialInstructions: '',
      imageIndex: 0,
      basePrice: Number(item.price) || 0,
      price: Number(item.price) || 0,
    };
    setItemsInGroup(prev => [...prev, newItem]);
    setCurrentItemIndex(itemsInGroup.length);
  };

  const updateCurrentItem = (field, value) => {
    setItemsInGroup(prev => {
      const updated = [...prev];
      if (updated[currentItemIndex]) {
        updated[currentItemIndex] = {
          ...updated[currentItemIndex],
          [field]: value
        };
        // Update price logic
        if (field === 'service' || field === 'quantity') {
          const current = updated[currentItemIndex];
          const serviceMultiplier = current.service === 'Dry Cleaning' ? 1.5 : 1;
          current.price = (current.basePrice * serviceMultiplier * current.quantity);
        }
      }
      return updated;
    });
  };

  const handleAddToCart = () => {
    if (itemsInGroup.length === 0) {
      alert('Please add at least one item specification');
      return;
    }

    // Calculate total price for group
    const calculatedTotal = itemsInGroup.reduce((sum, curr) => sum + (curr.price || 0), 0);

    const groupData = {
      id: Date.now(),
      groupName,
      baseItem: item,
      images,
      items: itemsInGroup,
      totalQuantity: itemsInGroup.reduce((sum, curr) => sum + curr.quantity, 0),
      totalPrice: calculatedTotal,
      // 🔥 FIX: Map totalPrice to 'price' for CartContext
      price: calculatedTotal
    };

    onAddToCart(groupData);
  };

  const currentItem = itemsInGroup[currentItemIndex];
  const getDisplayTotal = () => itemsInGroup.reduce((sum, curr) => sum + (curr.price || 0), 0);

  // ... (Return JSX - Keep your Step 1, 2 UI logic. Update Step 3 footer to use handleAddToCart) ...
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* ... Header ... */}
        <div className="sticky top-0 z-10 bg-slate-900/95 px-8 py-6 border-b border-white/10 flex justify-between">
          <h3 className="text-2xl font-bold text-white">Customize {item.name}</h3>
          <button onClick={onClose} className="text-white text-xl">✕</button>
        </div>

        <div className="p-8">
          {/* Step 1 & 2 logic same as yours */}
          {step === 1 && (
            <div className="text-center p-10 border-2 border-dashed border-white/20 rounded-xl">
              <h4 className="text-white text-xl mb-4">Upload Photos</h4>
              <input type="file" ref={fileInputRef} multiple onChange={handleImageUpload} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Files</button>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto">
              <label className="text-white block mb-2">Group Name</label>
              <input type="text" className="w-full p-3 bg-white/10 text-white rounded-xl mb-6" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              <button onClick={startSpecification} className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full">Next</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex justify-between mb-4">
                <h4 className="text-white text-xl">Specify Items</h4>
                <button onClick={addNewItem} className="bg-green-600 text-white px-4 py-2 rounded-full">+ Add Item</button>
              </div>
              {/* ... Item Editor UI ... */}
              {currentItem && (
                <div className="bg-white/10 p-6 rounded-xl space-y-4 mb-6">
                  <h5 className="text-white font-bold">{currentItem.name}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white block mb-2">Service</label>
                      <select className="w-full p-2 bg-slate-800 text-white rounded" value={currentItem.service} onChange={(e) => updateCurrentItem('service', e.target.value)}>
                        <option>Washing</option><option>Dry Cleaning</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white block mb-2">Quantity</label>
                      <input type="number" className="w-full p-2 bg-slate-800 text-white rounded" value={currentItem.quantity} onChange={(e) => updateCurrentItem('quantity', parseInt(e.target.value))} min="1" />
                    </div>
                  </div>
                  <div className="text-right text-xl font-bold text-white">₹{currentItem.price}</div>
                </div>
              )}
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border-t border-white/10">
                <div className="text-white">Total: <span className="font-bold text-xl">₹{getDisplayTotal()}</span></div>
                <button onClick={handleAddToCart} className="bg-green-600 px-8 py-3 rounded-full text-white font-bold">Add to Cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemModal;