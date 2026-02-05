import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getMyServices, deleteServiceType, deleteItem, updateItem } from "../../api/catalogApi";
import AddServiceModal from "./AddServiceModal";
import AddItemModal from "./AddItemModal";

const Services = () => {
    const { shop } = useOutletContext() || {};
    const [services, setServices] = useState([]);
    const [editingItem, setEditingItem] = useState(null); // { id, itemName, price, category }

    const loadServices = async () => {
        try {
            const res = await getMyServices();
            setServices(res.data || []);
        } catch (err) {
            console.error("Failed to load services", err);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleDeleteService = async (id) => {
        if (!window.confirm("Delete this service and all its items?")) return;
        try {
            await deleteServiceType(id);
            loadServices();
        } catch (err) {
            alert("Failed to delete service");
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm("Delete this item?")) return;
        try {
            await deleteItem(id);
            loadServices();
        } catch (err) {
            alert("Failed to delete item");
        }
    };

    const handleSaveItem = async () => {
        if (!editingItem) return;
        try {
            await updateItem(editingItem.id, editingItem);
            setEditingItem(null);
            loadServices();
        } catch (err) {
            alert("Failed to update item");
        }
    };

    if (!shop) return <div className="text-white">Loading shop data...</div>;

    return (
        <div>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">Services Catalog</h2>
                    <p className="text-slate-400 mt-1">Manage your services and pricing</p>
                </div>
                {/* Main Add Service Button */}
                <AddServiceModal onAdded={loadServices} />
            </div>

            {/* Empty State */}
            {services.length === 0 && (
                <div className="bg-slate-800/40 border border-white/10 rounded-xl p-12 text-center backdrop-blur-sm">
                    <p className="text-slate-400 text-lg">No services added yet.</p>
                    <p className="text-slate-500 text-sm mt-2">Click "Add Service" to start.</p>
                </div>
            )}

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-slate-800/60 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm group/service">

                        {/* Service Header with + Add Item Button */}
                        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{service.serviceName}</h3>
                                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Service</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <AddItemModal serviceTypeId={service.id} onAdded={loadServices} />
                                <button
                                    onClick={() => handleDeleteService(service.id)}
                                    className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5 opacity-0 group-hover/service:opacity-100"
                                    title="Delete Service"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                            {(!service.items || service.items.length === 0) ? (
                                <p className="text-slate-500 text-sm italic">No items added to this service yet.</p>
                            ) : (
                                service.items.map(item => (
                                    <div key={item.id} className="bg-slate-900/50 p-3 rounded-lg border border-white/5 group/item transition-all hover:border-white/10">

                                        {editingItem?.id === item.id ? (
                                            /* Editing Mode */
                                            <div className="flex gap-2 items-center">
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        value={editingItem.itemName}
                                                        onChange={e => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                                        className="w-full bg-slate-800 border-slate-700 rounded px-2 py-1 text-white text-sm"
                                                        placeholder="Item Name"
                                                    />
                                                    <input
                                                        value={editingItem.price}
                                                        onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                                                        type="number"
                                                        className="w-24 bg-slate-800 border-slate-700 rounded px-2 py-1 text-white text-sm"
                                                        placeholder="Price"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={handleSaveItem} className="text-green-400 hover:bg-green-500/10 p-1 rounded">✅</button>
                                                    <button onClick={() => setEditingItem(null)} className="text-red-400 hover:bg-red-500/10 p-1 rounded">❌</button>
                                                </div>
                                            </div>
                                        ) : (
                                            /* View Mode */
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-medium text-slate-200">{item.itemName}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-2">
                                                        <span>{item.category}</span>
                                                        {item.popular && <span className="text-yellow-500">★ Popular</span>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="font-bold text-indigo-400">₹{item.price}</div>

                                                    {/* Actions (Visible on Hover) */}
                                                    <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => setEditingItem(item)}
                                                            className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;