import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/customer/order/list');
            setOrders(res.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await api.post('/customer/order/cancel', null, {
                params: { orderId }
            });
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Failed to cancel order", error);
            alert("Failed to cancel order");
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'CONFIRMED': return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: CheckCircle };
            case 'IN_PROGRESS': return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Clock };
            case 'READY': return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Package };
            case 'COMPLETED': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle };
            case 'CANCELLED': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle };
            default: return { color: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10', icon: AlertCircle };
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Package className="text-blue-400" />
                My Orders
            </h1>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white/60">Loading your orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <div className="text-6xl mb-6 opacity-50">📦</div>
                    <h3 className="text-xl font-medium text-white mb-2">No orders yet</h3>
                    <p className="text-white/50 mb-6">Looks like you haven't placed any orders yet.</p>
                    <a href="/home" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg inline-block">
                        Start Washing
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const statusConfig = getStatusConfig(order.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div key={order.orderId} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-white">
                                                    Order #{order.orderId}
                                                </h3>
                                                <span className="text-white/40 text-sm">•</span>
                                                <span className="text-white/60 text-sm">{new Date().toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-blue-300 font-medium">
                                                {order.shopName}
                                            </p>
                                        </div>

                                        <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
                                            <StatusIcon size={16} />
                                            <span className="text-sm font-bold tracking-wide">{order.status}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white/40 text-sm uppercase font-bold">Total Amount</span>
                                            <span className="text-2xl font-bold text-white">₹{order.totalAmount}</span>
                                        </div>

                                        {order.status === 'CONFIRMED' && (
                                            <button
                                                onClick={() => handleCancel(order.orderId)}
                                                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
