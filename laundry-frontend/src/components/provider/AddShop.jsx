import { useState } from "react";
import { createShop } from "../../api/shopApi";
import { Store, MapPin, Phone, FileText, Clock, Truck, Plus } from "lucide-react";

const InputField = ({ icon: Icon, name, placeholder, value, onChange }) => (
    <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 block pl-10 p-3.5 transition-all outline-none hover:bg-white/10"
            placeholder={placeholder}
        />
    </div>
);

const AddShop = () => {
    // ✅ Get provider from login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const providerId = storedUser?.id;

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        description: "",
        openingHours: "",
        deliveryTime: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        if (!providerId) {
            alert("Provider not logged in");
            return;
        }

        try {
            const payload = {
                ...form
            };

            console.log("Creating shop:", payload);

            await createShop(payload);

            alert("Shop created successfully. Waiting for admin approval.");
        } catch (error) {
            console.error(error);
            alert("Failed to create shop");
        }
    };



    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
                        Establish Your Laundry Shop
                    </h1>
                    <p className="text-slate-400">Fill in the details to start managing your orders.</p>
                </div>

                <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <InputField
                                    icon={Store}
                                    name="name"
                                    placeholder="Shop Name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={MapPin}
                                    name="address"
                                    placeholder="Full Address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={Phone}
                                    name="phone"
                                    placeholder="Contact Number"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-6">
                                <InputField
                                    icon={Clock}
                                    name="openingHours"
                                    placeholder="Opening Hours (e.g., 9 AM - 9 PM)"
                                    value={form.openingHours}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={Truck}
                                    name="deliveryTime"
                                    placeholder="Delivery Time (e.g., 24 Hours)"
                                    value={form.deliveryTime}
                                    onChange={handleChange}
                                />
                                {/* Description (Textarea styled as input) */}
                                <div className="relative group">
                                    <div className="absolute top-3.5 left-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="1"
                                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 block pl-10 p-3.5 transition-all outline-none hover:bg-white/10 resize-none overflow-hidden"
                                        placeholder="Short Description"
                                        style={{ minHeight: '46px' }} // Match input height
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={handleCreate}
                                className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Plus size={20} />
                                    Create Shop
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShop;
