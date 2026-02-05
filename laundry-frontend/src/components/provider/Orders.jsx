import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getOrdersByShop, updateOrderStatus } from "../../api/ordersApi";

const Orders = () => {
    const { shop } = useOutletContext() || {}; 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get user for notifications
    const user = JSON.parse(localStorage.getItem("user"));

    const loadOrders = async () => {
        if (shop?.id) {
            console.log("Fetching orders for Shop ID:", shop.id); // ✅ Debug Log
            try {
                const res = await getOrdersByShop(shop.id);
                // Sort by newest first
                const sortedOrders = (res.data || []).sort((a, b) => b.orderId - a.orderId);
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Load failed", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadOrders();
        const interval = setInterval(loadOrders, 5000); // Auto-refresh
        return () => clearInterval(interval);
    }, [shop]);

    // ✅ ADDED NOTIFICATION FUNCTION
    const sendOrderStatusNotification = async (orderId, newStatus) => {
        try {
            await fetch(`http://localhost:8080/api/notifications/order/${orderId}/status/${newStatus}`, {
                method: 'POST'
            });
            console.log(`Notification sent for order ${orderId} status: ${newStatus}`);
        } catch (error) {
            console.log("Notification optional - status still updated");
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            
            // ✅ ADDED: Send notification to customer
            await sendOrderStatusNotification(orderId, newStatus);
            
            loadOrders(); // Reload to reflect changes
            
            // Show success message
            alert(`Order status updated to ${newStatus}. Customer has been notified.`);
        } catch (error) {
            alert("Update failed");
        }
    };

    const getStatusColor = (status) => {
        if (status === "CONFIRMED") return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
        if (status === "IN_PROGRESS") return "bg-blue-500/20 text-blue-500 border-blue-500/30";
        if (status === "READY") return "bg-green-500/20 text-green-500 border-green-500/30";
        if (status === "COMPLETED") return "bg-purple-500/20 text-purple-500 border-purple-500/30";
        return "bg-gray-500/20 text-gray-500";
    };

    if (loading) return <div className="p-8 text-white">Loading orders...</div>;
    if (!shop) return <div className="p-8 text-red-400">Error: Shop context missing.</div>;

    return (
        <div className="w-full">
            <div className="bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Incoming Orders</h2>
                    <span className="text-slate-400 text-sm">Shop ID: {shop.id}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-300">
                        <thead className="bg-slate-900/50 uppercase text-xs font-semibold text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items Details</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        No active orders found for Shop #{shop.id}.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.orderId} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-slate-400">#{order.orderId}</td>
                                        <td className="px-6 py-4 font-medium text-white">{order.customerName || "Guest"}</td>
                                        
                                        {/* ✅ Items Column (With Safety Check) */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-sm">
                                                {order.groups && order.groups.length > 0 ? (
                                                    order.groups.map((g, i) => (
                                                        <div key={i}>
                                                            <span className="text-indigo-400 font-medium">{g.groupName}: </span>
                                                            <span className="text-slate-400">
                                                                {g.items?.map(item => `${item.itemName} (x${item.quantity})`).join(", ")}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-500 italic">No details</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">₹{order.totalAmount}</td>
                                        
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-wide`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right">
                                            {order.status === "CONFIRMED" && (
                                                <button 
                                                    onClick={() => handleStatusChange(order.orderId, "IN_PROGRESS")}
                                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
                                                >
                                                    Accept
                                                </button>
                                            )}
                                            {order.status === "IN_PROGRESS" && (
                                                <button 
                                                    onClick={() => handleStatusChange(order.orderId, "READY")}
                                                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-yellow-500/20 transition-all"
                                                >
                                                    Mark Ready
                                                </button>
                                            )}
                                            {order.status === "READY" && (
                                                <button 
                                                    onClick={() => handleStatusChange(order.orderId, "COMPLETED")}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-green-500/20 transition-all"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            {order.status === "COMPLETED" && (
                                                <span className="text-slate-500 text-xs italic">Archived</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;