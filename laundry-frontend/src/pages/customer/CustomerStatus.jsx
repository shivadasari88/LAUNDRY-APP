import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                // Fetch orders for this customer
                const res = await axios.get(`http://localhost:8080/api/customer/orders/${user.id}`);
                // Sort by ID descending (Newest first)
                setOrders(res.data.sort((a, b) => b.orderId - a.orderId));
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        // Poll every 5 seconds for updates
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [navigate]);

    const getStepStatus = (status) => {
        const steps = { 'CONFIRMED': 1, 'IN_PROGRESS': 2, 'READY': 3, 'COMPLETED': 4 };
        return steps[status] || 1;
    };

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-cyan-600">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-50">
                <div className="text-xl font-bold text-cyan-700 flex items-center gap-2">
                    <span>📦</span> My Orders
                </div>
                <Link to="/home" className="text-slate-500 hover:text-cyan-600 font-medium transition">
                    ← Back to Home
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="text-4xl mb-4">🧺</div>
                        <p className="text-slate-400 text-lg">No active orders found.</p>
                        <Link to="/home" className="inline-block mt-4 px-6 py-2 bg-cyan-600 text-white rounded-full font-bold hover:bg-cyan-700 transition">
                            Place an Order
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => {
                        const currentStep = getStepStatus(order.status);
                        return (
                            <div key={order.orderId} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">Order #{order.orderId}</h3>
                                        <p className="text-slate-500 text-sm font-medium">{order.shopName || "Laundry Service"}</p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {order.orderTime ? new Date(order.orderTime).toLocaleString() : "Just now"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-cyan-600">₹{order.totalAmount}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mt-1 ${
                                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                            order.status === 'READY' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-cyan-50 text-cyan-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* 📊 VISUAL TRACKER */}
                                <div className="relative px-2 py-4">
                                    {/* Gray Background Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
                                    
                                    {/* Colored Active Line */}
                                    <div 
                                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 -translate-y-1/2 z-0 transition-all duration-700 rounded-full"
                                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                    ></div>

                                    {/* Icons */}
                                    <div className="relative z-10 flex justify-between w-full">
                                        <StatusStep step={1} currentStep={currentStep} icon="📋" label="Confirmed" />
                                        <StatusStep step={2} currentStep={currentStep} icon="🫧" label="Processing" />
                                        <StatusStep step={3} currentStep={currentStep} icon="🛍️" label="Ready" />
                                        <StatusStep step={4} currentStep={currentStep} icon="✅" label="Done" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
};

const StatusStep = ({ step, currentStep, icon, label }) => {
    const isActive = currentStep >= step;
    return (
        <div className="flex flex-col items-center bg-white px-2 z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                isActive ? "border-cyan-500 text-cyan-600 bg-cyan-50 scale-110 shadow-sm" : "border-slate-200 text-slate-300"
            }`}>
                {icon}
            </div>
            <p className={`text-[10px] md:text-xs mt-2 font-bold uppercase tracking-wide transition-colors ${
                isActive ? "text-cyan-700" : "text-slate-300"
            }`}>
                {label}
            </p>
        </div>
    );
};

export default CustomerStatus;