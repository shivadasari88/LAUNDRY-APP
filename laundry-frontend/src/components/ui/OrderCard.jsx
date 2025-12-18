import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';

const OrderCard = ({ order }) => {
    const statusColor =
        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700';

    const StatusIcon =
        order.status === 'Completed' ? CheckCircle :
            order.status === 'Processing' ? Clock : Package;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 text-lg">Order #{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusColor}`}>
                        <StatusIcon size={12} /> {order.status}
                    </span>
                </div>
                <p className="text-slate-500 text-sm">Service: <span className="font-medium text-slate-700">{order.serviceType}</span></p>
                <p className="text-slate-500 text-sm">Items: <span className="font-medium text-slate-700">{order.itemsDescription}</span></p>
                <p className="text-xs text-slate-400">{order.date}</p>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                <span className="text-2xl font-bold text-sky-600">${order.amount}</span>
                <button className="text-sm font-medium text-slate-500 hover:text-sky-600 underline">View Details</button>
            </div>
        </div>
    );
};

export default OrderCard;
