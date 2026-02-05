import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getOrdersByShop, updateOrderStatus } from "../../api/ordersApi";

const Orders = () => {
    const { shop } = useOutletContext() || {};
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders when shop is loaded
    const loadOrders = async () => {
        if (shop?.id) {
            setLoading(true);
            try {
                const res = await getOrdersByShop(shop.id);
                setOrders(res.data);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadOrders();
    }, [shop]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            loadOrders(); // Refresh list after update
        } catch (error) {
            alert("Failed to update status");
        }
    };

    // Helper for Status Badge Colors
    const getStatusColor = (status) => {
        switch (status) {
            case "CONFIRMED": return "bg-yellow-500/20 text-yellow-500";
            case "IN_PROGRESS": return "bg-blue-500/20 text-blue-500";
            case "READY": return "bg-green-500/20 text-green-500";
            case "OUT_FOR_DELIVERY": return "bg-orange-500/20 text-orange-500";
            case "DELIVERED": return "bg-purple-500/20 text-purple-500";
            default: return "bg-slate-700 text-slate-300";
        }
    };

    if (!shop) return <div className="text-white p-6">Loading shop data...</div>;

    return (
        <div>
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800/60 p-5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                    <h3 className="text-3xl font-bold text-white">{orders.filter(o => o.status === 'CONFIRMED').length}</h3>
                    <p className="text-slate-400 text-sm">New Orders</p>
                </div>
                <div className="bg-indigo-900/40 p-5 rounded-xl border border-indigo-500/30 shadow-lg">
                    <h3 className="text-3xl font-bold text-indigo-300">{orders.filter(o => o.status === 'IN_PROGRESS').length}</h3>
                    <p className="text-indigo-200/70 text-sm">In Progress</p>
                </div>
                <div className="bg-emerald-900/40 p-5 rounded-xl border border-emerald-500/30 shadow-lg">
                    <h3 className="text-3xl font-bold text-emerald-300">{orders.filter(o => o.status === 'READY').length}</h3>
                    <p className="text-emerald-200/70 text-sm">Ready</p>
                </div>
                <div className="bg-purple-900/40 p-5 rounded-xl border border-purple-500/30 shadow-lg">
                    <h3 className="text-3xl font-bold text-purple-300">{orders.filter(o => o.status === 'OUT_FOR_DELIVERY').length}</h3>
                    <p className="text-purple-200/70 text-sm">Out for Delivery</p>
                </div>
            </div>

            {/* Orders Table Container */}
            <div className="bg-slate-800/60 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-slate-300 text-sm">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.orderId || order.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-white">#{order.orderDisplayId || order.orderId || order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{order.customerName}</div>
                                            <div className="text-xs text-slate-500">{order.orderTime ? new Date(order.orderTime).toLocaleDateString() : 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Logic to show item summary */}
                                            {/* Logic to show item summary */}
                                            {order.groups?.length > 0 ? (
                                                <div className="space-y-2">
                                                    {order.groups.map((group, idx) => (
                                                        <div key={idx} className="bg-slate-800/50 p-2 rounded border border-white/5">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-bold text-xs text-indigo-300">{group.groupName}</span>
                                                                <span className="text-xs text-slate-500">{group.items?.length || 0} items</span>
                                                            </div>
                                                            {/* Photos Thumbnails */}
                                                            {group.photos?.length > 0 && (
                                                                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                                                                    {group.photos.map((photo, pIdx) => (
                                                                        <img
                                                                            key={pIdx}
                                                                            src={photo}
                                                                            alt="Item"
                                                                            className="w-10 h-10 object-cover rounded border border-white/10 hover:scale-150 transition-transform cursor-pointer"
                                                                            title="Click to zoom (future)"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {/* Item list concise */}
                                                            <div className="text-xs text-slate-400 mt-1">
                                                                {group.items?.map(i => i.itemName || "Item").join(", ").substring(0, 30)}
                                                                {(group.items?.reduce((acc, curr) => acc + (curr.itemName || "").length, 0) || 0) > 30 ? "..." : ""}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                order.itemsDescription || 'Items'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-white">₹{order.totalAmount || order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            {/* Logic for Action Buttons */}
                                            {order.status === "CONFIRMED" && (
                                                <button
                                                    onClick={() => handleStatusChange(order.id || order.orderId, "IN_PROGRESS")}
                                                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
                                                >
                                                    Start Order
                                                </button>
                                            )}
                                            {order.status === "IN_PROGRESS" && (
                                                <button
                                                    onClick={() => handleStatusChange(order.id || order.orderId, "READY")}
                                                    className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-xs font-bold transition-all"
                                                >
                                                    Mark Ready
                                                </button>
                                            )}
                                            {order.status === "READY" && (
                                                <button
                                                    onClick={() => handleStatusChange(order.id || order.orderId, "OUT_FOR_DELIVERY")}
                                                    className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold transition-all"
                                                >
                                                    Out for Delivery
                                                </button>
                                            )}
                                            {order.status === "OUT_FOR_DELIVERY" && (
                                                <button
                                                    onClick={() => handleStatusChange(order.id || order.orderId, "DELIVERED")}
                                                    className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-bold transition-all"
                                                >
                                                    Mark Delivered
                                                </button>
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