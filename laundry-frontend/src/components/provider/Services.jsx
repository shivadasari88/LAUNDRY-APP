import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getServicesByShop } from "../../api/catalogApi";
import AddServiceModal from "./AddServiceModal";
import AddItemModal from "./AddItemModal";
import axios from "axios";

const Services = () => {
    const { shop } = useOutletContext() || {};
    const [services, setServices] = useState([]);

    const loadServices = async () => {
        if (shop?.id) {
            try {
                const res = await getServicesByShop(shop.id);
                setServices(res.data || []);
            } catch (err) { console.error("Failed to load services", err); }
        }
    };

    useEffect(() => { loadServices(); }, [shop]);

    // ✅ DELETE FUNCTION
    const handleDeleteItem = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            // Assuming endpoint is /api/provider/items/{id}
            await axios.delete(`http://localhost:8080/api/provider/items/${itemId}`);
            alert("Item deleted successfully");
            loadServices();
        } catch (error) {
            console.error(error);
            alert("Failed to delete item.");
        }
    };

    // Placeholder for Edit
    const handleEditItem = (item) => {
        alert(`Edit functionality for ${item.itemName} coming soon! (Implement UpdateItemModal here)`);
        // Logic: Open a modal similar to AddItemModal, pre-fill data, call PUT API.
    };

    if (!shop) return <div className="text-slate-500 text-center mt-10">Loading shop data...</div>;

    return (
        <div className="fade-in">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Services Catalog</h2>
                    <p className="text-slate-500 mt-1">Manage your services, items, and pricing.</p>
                </div>
                <AddServiceModal shopId={shop.id} onAdded={loadServices} />
            </div>

            {services.length === 0 && (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                    <p className="text-slate-400 text-lg">No services added yet.</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        
                        {/* Service Header */}
                        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{service.serviceName}</h3>
                                <p className="text-xs text-cyan-600 font-bold uppercase tracking-wider mt-1">Service Category</p>
                            </div>
                            <AddItemModal serviceTypeId={service.id} onAdded={loadServices} />
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                            {(!service.items || service.items.length === 0) ? (
                                <p className="text-slate-400 text-sm italic">No items yet.</p>
                            ) : (
                                service.items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 group">
                                        <div>
                                            <div className="font-bold text-slate-700">{item.itemName}</div>
                                            <div className="text-xs text-slate-500">
                                                {item.category} 
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-slate-800">₹{item.price}</span>
                                            
                                            {/* ✅ EDIT / DELETE BUTTONS */}
                                            <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleEditItem(item)}
                                                    className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-white rounded transition" 
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded transition" 
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
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