import React, { useState } from 'react';
import OrderCard from '../components/ui/OrderCard';

const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    const tabs = ['All Orders', 'Active', 'Completed'];

    // Mock Orders Data
    const orders = [
        { id: '10234', status: 'Processing', serviceType: 'Washing & Folding', itemsDescription: '2 Shirts, 1 Jeans', amount: '12.50', date: 'May 12, 2024' },
        { id: '10233', status: 'Completed', serviceType: 'Dry Clean', itemsDescription: '1 Suit (Blazer + Pant)', amount: '25.00', date: 'May 10, 2024' },
        { id: '10232', status: 'Completed', serviceType: 'Ironing', itemsDescription: '5 Shirts', amount: '15.00', date: 'May 05, 2024' },
        { id: '10231', status: 'Pending', serviceType: 'Washing', itemsDescription: '1 Bed Sheet, 2 Pillow Covers', amount: '18.00', date: 'May 01, 2024' },
    ];

    const filteredOrders = activeTab === 'All Orders'
        ? orders
        : activeTab === 'Active'
            ? orders.filter(o => o.status === 'Processing' || o.status === 'Pending')
            : orders.filter(o => o.status === 'Completed');

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">My Orders</h1>

                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg self-start">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                    ? 'bg-white text-sky-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        No {activeTab.toLowerCase()} found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
