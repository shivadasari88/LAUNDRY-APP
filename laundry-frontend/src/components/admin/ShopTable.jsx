import React from 'react';
import { Check, X, Loader2, Store } from 'lucide-react';

const ShopTable = ({ shops, loading, onApprove, onReject, status }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-indigo-400" />
            </div>
        );
    }

    if (shops.length === 0) {
        return (
            <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/10 backdrop-blur-sm">
                <p className="text-indigo-200/50 text-lg">No {status ? status.toLowerCase() : ''} shops found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Shop ID</th>
                        <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Shop Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Status</th>
                        {status === 'PENDING' && <th className="px-6 py-4 text-sm font-semibold text-indigo-200/70 uppercase tracking-wider">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {shops.map((shop) => (
                        <tr key={shop.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 text-sm text-indigo-100 font-medium">#{shop.id}</td>
                            <td className="px-6 py-4 text-sm text-white font-semibold flex items-center gap-2">
                                <Store size={16} className="text-indigo-400" />
                                {shop.name || shop.shopName}
                            </td>
                            <td className="px-6 py-4 text-sm text-indigo-200/80">{shop.ownerName || "owner"}</td>
                            <td className="px-6 py-4 text-sm text-indigo-200/80 max-w-xs truncate" title={shop.address}>
                                {shop.address}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${shop.approvalStatus === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    shop.approvalStatus === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {shop.approvalStatus}
                                </span>
                            </td>
                            {status === 'PENDING' && (
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onApprove(shop.id)}
                                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 transition-all"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => onReject(shop.id)}
                                            className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/30 transition-all"
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
