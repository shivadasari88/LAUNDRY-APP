import React, { useEffect, useState } from 'react';
import { getMyShop } from "../../api/shopApi"; 

const ProviderProfile = () => {
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);

            if (storedUser?.id) {
                try {
                    const res = await getMyShop(storedUser.id);
                    setShop(res.data);
                } catch (error) {
                    console.error("Failed to load shop profile", error);
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="text-white text-center p-10">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">My Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg">
                            👤
                        </div>
                        <h3 className="text-xl font-bold text-white">{user?.username || "Provider"}</h3>
                        <p className="text-slate-400 text-sm mt-1">Service Provider</p>
                        <div className="mt-4 px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                            Active Account
                        </div>
                    </div>
                </div>

                {/* Shop Details Card */}
                <div className="md:col-span-2 bg-slate-800/60 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    {shop ? (
                        <>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{shop.shopName}</h3>
                                    <p className="text-slate-400 mt-1">{shop.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${shop.approvalStatus === 'APPROVED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {shop.approvalStatus}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                        <label className="text-xs text-slate-500 uppercase font-bold">Contact Phone</label>
                                        <p className="text-white font-mono text-lg">{shop.phone}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                        <label className="text-xs text-slate-500 uppercase font-bold">Address</label>
                                        <p className="text-white">{shop.address}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                        <label className="text-xs text-slate-500 uppercase font-bold">Opening Hours</label>
                                        <p className="text-white">{shop.openingHours}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                        <label className="text-xs text-slate-500 uppercase font-bold">Delivery Time</label>
                                        <p className="text-white">{shop.deliveryTime}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400">No shop linked to this account yet.</p>
                            <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all">
                                + Create Shop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;