import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMyShop } from "../../api/shopApi";
import AddShop from "../../components/provider/AddShop";
import ShopPending from "../../components/provider/ShopPending";
import NotificationBell from "../../components/NotificationBell"; 

const ProviderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const providerId = user?.id;

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;

    getMyShop(providerId)
      .then(res => setShop(res.data))
      .catch(() => setShop(null))
      .finally(() => setLoading(false));
  }, [providerId]);

  // Loading screen
  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
      <p className="ml-4">Loading your dashboard...</p>
    </div>
  );

  if (!providerId) return <div className="p-6 text-red-500 font-bold bg-slate-900 h-screen">Error: Not Logged In</div>;

  // 1. No Shop Created Yet -> Show Create Shop Form
  if (!shop) return (
    <div className="min-h-screen bg-slate-900">
      <header className="p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Create Your Shop</div>
        <NotificationBell userId={providerId} userRole="PROVIDER" />
      </header>
      <AddShop />
    </div>
  );

  // 2. Shop Created but Pending Approval -> Show Pending Screen
  if (shop.approvalStatus === "PENDING" || shop.approvalStatus === "REJECTED") {
    return (
      <div className="min-h-screen bg-slate-900">
        <header className="p-4 flex justify-between items-center">
          <div className="text-white text-xl font-bold">Shop Approval Pending</div>
          <NotificationBell userId={providerId} userRole="PROVIDER" />
        </header>
        <ShopPending status={shop.approvalStatus} />
      </div>
    );
  }

  // 3. Shop Approved -> Show Full Dashboard with sidebar layout
  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-white/10 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Provider Panel</h1>
          <p className="text-sm text-slate-400">{shop.shopName}</p>
        </div>
        
        <nav className="space-y-2">
          <a href="/provider/services" className="block p-3 text-white hover:bg-white/5 rounded-lg">
            🧺 Services
          </a>
          <a href="/provider/orders" className="block p-3 text-white hover:bg-white/5 rounded-lg">
            📦 Orders
          </a>
          <a href="/provider/status" className="block p-3 text-white hover:bg-white/5 rounded-lg">
            📊 Order Flow
          </a>
          <a href="/provider/profile" className="block p-3 text-white hover:bg-white/5 rounded-lg">
            👤 Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header with NotificationBell */}
        <header className="bg-slate-800 border-b border-white/10 p-4 flex justify-between items-center">
          <div className="text-white">
            Welcome, <span className="font-bold">{user?.username}</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell userId={providerId} userRole="PROVIDER" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              View as Customer
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet context={{ shop }} />
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;