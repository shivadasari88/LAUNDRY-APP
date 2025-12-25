// src/components/provider/PricingManagement.jsx
import { useState } from 'react';

const PricingManagement = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Washing', price: 30, items: ['Shirt', 'Pant', 'T-Shirt'] },
    { id: 2, name: 'Dry Cleaning', price: 100, items: ['Suit', 'Saree', 'Coat'] },
    { id: 3, name: 'Ironing', price: 20, items: ['Shirt', 'Pant', 'Kurta'] },
    { id: 4, name: 'Washing + Ironing', price: 45, items: ['Shirt', 'Pant', 'T-Shirt'] }
  ]);

  const [items, setItems] = useState([
    { id: 1, name: 'Shirt', washing: 30, dryCleaning: 80, ironing: 20 },
    { id: 2, name: 'Pant', washing: 40, dryCleaning: 100, ironing: 25 },
    { id: 3, name: 'T-Shirt', washing: 25, dryCleaning: 60, ironing: 15 },
    { id: 4, name: 'Saree', washing: 50, dryCleaning: 120, ironing: 30 },
    { id: 5, name: 'Jeans', washing: 60, dryCleaning: 150, ironing: 30 },
    { id: 6, name: 'Bedsheet', washing: 80, dryCleaning: 200, ironing: 40 }
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '' });

  const handleSaveItem = (itemId, field, value) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, [field]: Number(value) } : item
    ));
  };

  const handleAddService = () => {
    if (newService.name && newService.price) {
      const newServiceObj = {
        id: services.length + 1,
        name: newService.name,
        price: Number(newService.price),
        items: []
      };
      setServices(prev => [...prev, newServiceObj]);
      setNewService({ name: '', price: '' });
      setShowAddService(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pricing & Services</h2>
          <p className="text-white/70">Manage your service prices and item rates</p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
        >
          + Add New Service
        </button>
      </div>

      {/* Services Overview */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Service Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white/10 rounded-xl p-5 border border-white/20 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{service.name}</h4>
                  <p className="text-white/70 text-sm">Base service</p>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-3">₹{service.price}</div>
              <div className="text-sm text-white/60 mb-4">
                {service.items.length} items configured
              </div>
              <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                Configure Items
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Item-wise Pricing */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Item-wise Pricing</h3>
          <p className="text-white/70">Set different prices for each item and service type</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Item</th>
                <th className="text-left p-4 text-white/70 font-medium">Washing</th>
                <th className="text-left p-4 text-white/70 font-medium">Dry Cleaning</th>
                <th className="text-left p-4 text-white/70 font-medium">Ironing</th>
                <th className="text-left p-4 text-white/70 font-medium">Total</th>
                <th className="text-left p-4 text-white/70 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="font-medium text-white">{item.name}</div>
                  </td>
                  <td className="p-4">
                    {editingItem === `${item.id}-washing` ? (
                      <input
                        type="number"
                        value={item.washing}
                        onChange={(e) => handleSaveItem(item.id, 'washing', e.target.value)}
                        onBlur={() => setEditingItem(null)}
                        className="w-24 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="text-white cursor-pointer hover:bg-white/10 p-2 rounded"
                        onClick={() => setEditingItem(`${item.id}-washing`)}
                      >
                        ₹{item.washing}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {editingItem === `${item.id}-dryCleaning` ? (
                      <input
                        type="number"
                        value={item.dryCleaning}
                        onChange={(e) => handleSaveItem(item.id, 'dryCleaning', e.target.value)}
                        onBlur={() => setEditingItem(null)}
                        className="w-24 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="text-white cursor-pointer hover:bg-white/10 p-2 rounded"
                        onClick={() => setEditingItem(`${item.id}-dryCleaning`)}
                      >
                        ₹{item.dryCleaning}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {editingItem === `${item.id}-ironing` ? (
                      <input
                        type="number"
                        value={item.ironing}
                        onChange={(e) => handleSaveItem(item.id, 'ironing', e.target.value)}
                        onBlur={() => setEditingItem(null)}
                        className="w-24 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-white"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="text-white cursor-pointer hover:bg-white/10 p-2 rounded"
                        onClick={() => setEditingItem(`${item.id}-ironing`)}
                      >
                        ₹{item.ironing}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">
                      ₹{item.washing + item.dryCleaning + item.ironing}
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm transition-colors">
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Add New Service</h3>
                <button 
                  onClick={() => setShowAddService(false)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-white">Service Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                    placeholder="e.g., Steam Press, Stain Removal"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">Base Price (₹)</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                    placeholder="Enter base price"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAddService(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddService}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManagement;