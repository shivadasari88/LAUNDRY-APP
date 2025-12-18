import React from 'react';

const SummaryCard = ({ title, value, icon: Icon, colorClass }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
            {Icon && (
                <div className={`p-3 rounded-full ${colorClass}`}>
                    <Icon size={24} className="text-white" />
                </div>
            )}
        </div>
    );
};

export default SummaryCard;
