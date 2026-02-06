import React from 'react';
import { Check, X, Loader2 } from 'lucide-react';

const ShopTable = ({ shops, loading, onApprove, onReject, status }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-primary-600" />
            </div>
        );
    }

    if (shops.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-lg">No {status.toLowerCase()} shops found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Shop ID</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Shop Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Owner</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Address</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                        {status === 'PENDING' && <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {shops.map((shop) => (
                        <tr key={shop.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">#{shop.id}</td>
                            <td className="px-6 py-4 text-sm text-slate-900 font-semibold">{shop.shopName}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{shop.ownerName}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{shop.address}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${shop.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                                        shop.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-rose-50 text-rose-600'
                                    }`}>
                                    {shop.status}
                                </span>
                            </td>
                            {status === 'PENDING' && (
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onApprove(shop.id)}
                                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => onReject(shop.id)}
                                            className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShopTable;
