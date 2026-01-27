import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getServicesByShop } from "../../api/catalogApi";
import AddServiceModal from "./AddServiceModal";
import AddItemModal from "./AddItemModal";

const Services = () => {
    const { shop } = useOutletContext() || {}; // Safe access
    const [services, setServices] = useState([]);

    const loadServices = async () => {
        if (shop?.id) {
            try {
                const res = await getServicesByShop(shop.id);
                setServices(res.data || []);
            } catch (err) {
                console.error("Failed to load services", err);
            }
        }
    };

    useEffect(() => {
        loadServices();
    }, [shop]);

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
                <AddServiceModal shopId={shop.id} onAdded={loadServices} />
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
                    <div key={service.id} className="bg-slate-800/60 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                        
                        {/* Service Header with + Add Item Button */}
                        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{service.serviceName}</h3>
                                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Service</p>
                            </div>
                            {/* ✅ HERE IS THE ADD ITEM BUTTON */}
                            <AddItemModal serviceTypeId={service.id} onAdded={loadServices} />
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                            {(!service.items || service.items.length === 0) ? (
                                <p className="text-slate-500 text-sm italic">No items added to this service yet.</p>
                            ) : (
                                service.items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-white/5">
                                        <div>
                                            <div className="font-medium text-slate-200">{item.itemName}</div>
                                            <div className="text-xs text-slate-500">
                                                {item.category} 
                                                {item.popular && <span className="ml-2 text-yellow-500 text-xs">★ Popular</span>}
                                            </div>
                                        </div>
                                        <div className="font-bold text-indigo-400">₹{item.price}</div>
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