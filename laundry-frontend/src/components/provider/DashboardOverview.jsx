import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getOrdersByShop } from "../../api/ordersApi"; // Ensure this matches API file
import { getMyServices } from "../../api/catalogApi";

const DashboardOverview = () => {
    const { shop } = useOutletContext() || {};
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        servicesCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!shop?.id) return;

            try {
                // Fetch Orders
                const ordersRes = await getOrdersByShop(shop.id);
                const orders = ordersRes.data || [];

                // Fetch Services
                const servicesRes = await getMyServices(); // Secure
                const services = servicesRes.data || [];

                // Calculate Stats
                const totalOrders = orders.length;
                const pendingOrders = orders.filter(o => o.status === "CONFIRMED" || o.status === "IN_PROGRESS").length;
                const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0);
                const servicesCount = services.length;

                setStats({
                    totalOrders,
                    pendingOrders,
                    totalRevenue,
                    servicesCount
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [shop]);

    if (!shop) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome, {shop.name}</h2>
                <p className="text-slate-400">Here's what's happening in your shop today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Revenue */}
                <div className="bg-slate-800/60 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-emerald-400 mt-2">₹{stats.totalRevenue.toLocaleString()}</h3>
                        </div>
                        <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 text-xl">💰</span>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-slate-800/60 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase">Total Orders</p>
                            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalOrders}</h3>
                        </div>
                        <span className="p-2 bg-blue-500/10 rounded-lg text-blue-500 text-xl">📦</span>
                    </div>
                </div>

                {/* Pending */}
                <div className="bg-slate-800/60 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase">Pending Action</p>
                            <h3 className="text-3xl font-bold text-orange-400 mt-2">{stats.pendingOrders}</h3>
                        </div>
                        <span className="p-2 bg-orange-500/10 rounded-lg text-orange-500 text-xl">⚠️</span>
                    </div>
                </div>

                {/* Services */}
                <div className="bg-slate-800/60 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase">Active Services</p>
                            <h3 className="text-3xl font-bold text-indigo-400 mt-2">{stats.servicesCount}</h3>
                        </div>
                        <span className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 text-xl">🏷️</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="orders" className="group bg-gradient-to-br from-indigo-600 to-blue-600 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">Manage Orders</h3>
                    <p className="text-indigo-100/80 text-sm mb-4">View and update status of customer orders.</p>
                    <div className="flex items-center text-white font-semibold">
                        Go to Orders <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link to="services" className="group bg-gradient-to-br from-slate-700 to-slate-600 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-2">Update Catalog</h3>
                    <p className="text-slate-300/80 text-sm mb-4">Add new services or update prices.</p>
                    <div className="flex items-center text-white font-semibold">
                        Manage Services <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardOverview;
