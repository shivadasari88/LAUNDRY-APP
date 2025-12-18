import React from 'react';
import { Clock, CheckCircle, Package, DollarSign, User } from 'lucide-react';
import SummaryCard from '../components/ui/SummaryCard';

const Dashboard = () => {
    const user = { name: "Alex Johnson", avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0284c7&color=fff" }; // Mock user

    const stats = [
        { title: "Pending Orders", value: "2", icon: Clock, color: "bg-orange-400" },
        { title: "In Progress", value: "1", icon: Package, color: "bg-blue-500" },
        { title: "Completed", value: "12", icon: CheckCircle, color: "bg-green-500" },
        { title: "Total Spent", value: "$420", icon: DollarSign, color: "bg-slate-700" },
    ];

    const recentOrders = [
        { id: "ORD-001", items: 5, price: "$45.00", date: "2024-05-10", status: "Processing" },
        { id: "ORD-002", items: 3, price: "$22.50", date: "2024-05-08", status: "Completed" },
        { id: "ORD-003", items: 8, price: "$75.00", date: "2024-05-01", status: "Completed" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4">
                <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Welcome, {user.name}</h1>
                    <p className="text-slate-500">Here's what's happening with your laundry.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <SummaryCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        colorClass={stat.color}
                    />
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
                    <button className="text-sky-600 text-sm font-medium hover:underline">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 text-sm">
                                    <td className="px-6 py-4 font-medium text-slate-700">{order.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{order.items} items</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{order.price}</td>
                                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
