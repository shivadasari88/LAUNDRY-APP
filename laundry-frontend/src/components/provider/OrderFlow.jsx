import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getOrdersByShop, updateOrderStatus } from '../../api/ordersApi';

const OrderFlow = () => {
    const { shop } = useOutletContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Poll for updates every 5 seconds
    useEffect(() => {
        const fetchOrders = async () => {
            if (shop?.id) {
                try {
                    const res = await getOrdersByShop(shop.id);
                    // Sort to show active orders first (descending ID)
                    const sorted = res.data.sort((a, b) => b.orderId - a.orderId);
                    setOrders(sorted);
                } catch (error) {
                    console.error("Load failed", error);
                }
            }
            setLoading(false);
        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [shop]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            // Optimistic update
            setOrders(prev => prev.map(o =>
                o.orderId === orderId ? { ...o, status: newStatus } : o
            ));
        } catch (error) {
            alert("Update failed");
        }
    };

    const getStepStatus = (status) => {
        const steps = { 'CONFIRMED': 1, 'IN_PROGRESS': 2, 'READY': 3, 'COMPLETED': 4 };
        return steps[status] || 1;
    };

    if (loading) return <div className="p-8 text-white text-center">Loading Flow...</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Live Order Tracking</h2>
                <p className="text-slate-400">Manage order lifecycle visually</p>
            </div>

            <div className="grid gap-6">
                {orders.map((order) => {
                    const currentStep = getStepStatus(order.status);

                    return (
                        <div key={order.orderId} className="bg-slate-800 border border-white/10 rounded-2xl p-6 shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 uppercase">Order #{order.orderId}</span>
                                    <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                                    <p className="text-sm text-slate-400">
                                        {order.groups?.length || 0} Item Groups • ₹{order.totalAmount}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div>
                                    {order.status === 'CONFIRMED' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.orderId, 'IN_PROGRESS')}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
                                        >
                                            Accept & Start
                                        </button>
                                    )}
                                    {order.status === 'IN_PROGRESS' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.orderId, 'READY')}
                                            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg shadow-lg shadow-yellow-500/30 transition-all"
                                        >
                                            Mark Ready
                                        </button>
                                    )}
                                    {order.status === 'READY' && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.orderId, 'COMPLETED')}
                                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg shadow-green-500/30 transition-all"
                                        >
                                            Complete Order
                                        </button>
                                    )}
                                    {order.status === 'COMPLETED' && (
                                        <span className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium text-sm">
                                            Archived
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 📊 VISUAL STEPPER */}
                            <div className="relative px-4 py-4 bg-slate-900/50 rounded-xl">
                                {/* Gray Background Line */}
                                <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-700 -translate-y-1/2 rounded-full z-0"></div>

                                {/* Active Color Line */}
                                <div
                                    className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-blue-500 to-green-400 -translate-y-1/2 rounded-full z-0 transition-all duration-700"
                                    style={{ width: `calc(${((currentStep - 1) / 3) * 100}% - 2rem)` }}
                                ></div>

                                <div className="relative z-10 flex justify-between w-full">
                                    <StatusStep step={1} currentStep={currentStep} icon="📋" label="Confirmed" />
                                    <StatusStep step={2} currentStep={currentStep} icon="🫧" label="Processing" />
                                    <StatusStep step={3} currentStep={currentStep} icon="🛍️" label="Ready" />
                                    <StatusStep step={4} currentStep={currentStep} icon="✅" label="Done" />
                                </div>
                            </div>
                        </div>
                    );
                })}

                {orders.length === 0 && (
                    <div className="text-center py-10 text-slate-500">No active orders to track.</div>
                )}
            </div>
        </div>
    );
};

const StatusStep = ({ step, currentStep, icon, label }) => {
    const isActive = currentStep >= step;
    const isCompleted = currentStep > step;

    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-300 bg-slate-800 ${isActive
                        ? "border-green-500 text-green-500 scale-110 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "border-slate-600 text-slate-600 grayscale"
                    }`}
            >
                {isCompleted ? "✓" : icon}
            </div>
            <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-green-400" : "text-slate-600"}`}>
                {label}
            </p>
        </div>
    );
};

export default OrderFlow;