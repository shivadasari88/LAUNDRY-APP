import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShopById } from "../../api/adminApi";

const AdminShopDetails = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const res = await getShopById(shopId);
                setShop(res.data);
            } catch (err) {
                console.error("Failed to fetch shop details", err);
                // Fallback to mock data for demonstration if API fails or images are missing
                setShop({
                    id: shopId,
                    name: "Premium Laundry Hub",
                    address: "456 Skyline Blvd, Metro City",
                    phone: "+1 234 567 890",
                    rating: 4.8,
                    openingHours: "08:00 AM - 09:00 PM",
                    deliveryTime: "24 Hours",
                    description: "Our high-end laundry facility equipped with state-of-the-art machinery.",
                    images: [
                        "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
                        "https://images.unsplash.com/photo-1521656693084-38c4587c4873?auto=format&fit=crop&q=80&w=800",
                    ],
                    serviceGallery: [
                        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=400",
                        "https://images.unsplash.com/photo-1489274495757-95c7c137b29b?auto=format&fit=crop&q=80&w=400",
                        "https://images.unsplash.com/photo-1549443161-0aeec83908f4?auto=format&fit=crop&q=80&w=400",
                        "https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=400",
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchShop();
    }, [shopId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-indigo-200">Loading shop details...</p>
                </div>
            </div>
        );
    }

    if (!shop) return <div className="p-6 text-white text-center">Shop not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-6 text-white">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-indigo-300 hover:text-white transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Back to Dashboard
                </button>

                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                                    {shop.name}
                                </h1>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/20">
                                        <span className="text-lg">⭐</span>
                                        <span className="font-bold">{shop.rating || "4.5"}</span>
                                    </div>
                                    <p className="text-indigo-200/70 flex items-center gap-2">
                                        📍 {shop.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 px-6 py-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                <p className="text-indigo-200/50 text-xs uppercase tracking-widest">Opening Hours</p>
                                <p className="font-semibold text-indigo-100">{shop.openingHours}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shop Images Gallery */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                            Shop Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(shop.images || [
                                "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
                                "https://images.unsplash.com/photo-1521656693084-38c4587c4873?auto=format&fit=crop&q=80&w=800"
                            ]).map((img, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/10 aspect-video shadow-xl">
                                    <img
                                        src={img}
                                        alt={`Shop ${index}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-sm font-medium">Shop View {index + 1}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Service Done Gallery */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                            Service Portfolio
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(shop.serviceGallery || [
                                "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=400",
                                "https://images.unsplash.com/photo-1489274495757-95c7c137b29b?auto=format&fit=crop&q=80&w=400",
                                "https://images.unsplash.com/photo-1549443161-0aeec83908f4?auto=format&fit=crop&q=80&w=400",
                                "https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=400"
                            ]).map((img, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-xl border border-white/5 aspect-square shadow-lg">
                                    <img
                                        src={img}
                                        alt={`Service ${index}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Additional Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
                            <p className="text-indigo-300/50 text-xs uppercase mb-2">Contact Number</p>
                            <p className="text-lg font-semibold">{shop.phone}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
                            <p className="text-indigo-300/50 text-xs uppercase mb-2">Delivery Time</p>
                            <p className="text-lg font-semibold">{shop.deliveryTime}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
                            <p className="text-indigo-300/50 text-xs uppercase mb-2">Service Status</p>
                            <p className="text-lg font-semibold text-green-400">Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminShopDetails;
