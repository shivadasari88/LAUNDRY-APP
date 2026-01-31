import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getMyShop } from '../../api/shopApi';
import { getOrdersByShop } from '../../api/ordersApi'; // Import order API for stats
import AddShop from '../../components/provider/AddShop';
import ShopPending from '../../components/provider/ShopPending';
import ProviderLayout from '../../components/provider/ProviderLayout';

const ProviderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const providerId = user?.id;
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, revenue: 0, total: 0 });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!providerId) return;

    // 1. Fetch Shop Details
    getMyShop(providerId)
      .then(res => {
        setShop(res.data);
        // 2. If shop exists, fetch Stats for the dashboard widget
        if(res.data?.id) {
           fetchStats(res.data.id);
        }
      })
      .catch(() => setShop(null))
      .finally(() => setLoading(false));
  }, [providerId]);

  const fetchStats = async (shopId) => {
      try {
          const res = await getOrdersByShop(shopId);
          const orders = res.data || [];
          const pending = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'IN_PROGRESS').length;
          const revenue = orders.filter(o => o.status === 'COMPLETED').reduce((acc, curr) => acc + curr.totalAmount, 0);
          setStats({ pending, revenue, total: orders.length });
      } catch (e) { console.error("Stats error", e); }
  };

  // Loading State (Light Theme)
  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-cyan-600">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mb-4"></div>
    </div>
  );

  if (!providerId) return <div className="p-6 text-red-500 font-bold bg-slate-50 h-screen">Error: Not Logged In</div>;

  // 1. Create Shop
  if (!shop) return <AddShop />;

  // 2. Pending
  if (shop.approvalStatus === "PENDING" || shop.approvalStatus === "REJECTED") {
      return <ShopPending status={shop.approvalStatus} />;
  }

  // 3. Approved Dashboard
  // Check if we are on the root "/provider" path to show the Stats Widget
  const isRoot = location.pathname === "/provider" || location.pathname === "/provider/";

  return (
    <ProviderLayout>
      {isRoot ? (
        <div className="space-y-6 fade-in">
            <h2 className="text-3xl font-bold text-slate-800">👋 Welcome back, {shop.shopName}!</h2>
            <p className="text-slate-500">Here is what's happening in your laundry shop today.</p>
            
            {/* Stats Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-yellow-500">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Orders</h3>
                    <div className="text-4xl font-bold text-slate-800 mt-2">{stats.pending}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-green-500">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
                    <div className="text-4xl font-bold text-slate-800 mt-2">₹{stats.revenue}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-cyan-600">
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</h3>
                    <div className="text-4xl font-bold text-slate-800 mt-2">{stats.total}</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex justify-between items-center mt-8">
                <div>
                    <h3 className="text-xl font-bold text-blue-900">Manage Orders</h3>
                    <p className="text-blue-700">View and update status of incoming laundry.</p>
                </div>
                <button onClick={() => navigate("orders")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                    Go to Orders →
                </button>
            </div>
        </div>
      ) : (
        <Outlet context={{ shop }} />
      )}
    </ProviderLayout>
  );
};

export default ProviderDashboard;