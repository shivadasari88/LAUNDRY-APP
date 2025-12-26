// src/pages/provider/ProviderDashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderHeader from '../../components/provider/ProviderHeader';
import OrderManagement from '../../components/provider/OrderManagement';
import PricingManagement from '../../components/provider/PricingMangement.jsx';
import CustomerCommunication from '../../components/provider/CustomerCommunication';
import AnalyticsDashboard from '../../components/provider/AnalyticsDashboard';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [providerData, setProviderData] = useState({
    shopName: 'Quick Clean Laundry',
    shopId: 'PROV001',
    status: 'Active',
    totalOrders: 124,
    pendingOrders: 8,
    completedOrders: 116,
    todayRevenue: 8500,
    rating: 4.5
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-linear-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <span className="text-sm px-3 py-1 bg-blue-500/30 rounded-full text-blue-200">
                    Today
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-white/70">New Orders</div>
              </div>

              <div className="bg-linear-to-br from-green-500/20 to-green-600/20 rounded-2xl p-6 border border-green-400/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/30 flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <span className="text-sm px-3 py-1 bg-green-500/30 rounded-full text-green-200">
                    Today
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">₹{providerData.todayRevenue}</div>
                <div className="text-white/70">Today's Revenue</div>
              </div>

              <div className="bg-linear-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 border border-purple-400/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <span className="text-sm px-3 py-1 bg-purple-500/30 rounded-full text-purple-200">
                    Rating
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{providerData.rating}</div>
                <div className="text-white/70">Customer Rating</div>
              </div>

              <div className="bg-linear-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl p-6 border border-yellow-400/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/30 flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <span className="text-sm px-3 py-1 bg-yellow-500/30 rounded-full text-yellow-200">
                    Active
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">8</div>
                <div className="text-white/70">Processing</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-300">#{order}00{order}</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">Customer {order}</div>
                        <div className="text-sm text-white/60">3 items • ₹{450 * order}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                        Pending
                      </span>
                      <button className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return <OrderManagement />;
      
      case 'pricing':
        return <PricingManagement />;
      
      case 'communication':
        return <CustomerCommunication />;
      
      case 'analytics':
        return <AnalyticsDashboard />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      <ProviderHeader 
        shopName={providerData.shopName}
        shopId={providerData.shopId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProviderDashboard;