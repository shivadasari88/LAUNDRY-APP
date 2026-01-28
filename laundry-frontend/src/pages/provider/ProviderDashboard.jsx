import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMyShop } from "../../api/shopApi";

import AddShop from "../../components/provider/AddShop";
import ShopPending from "../../components/provider/ShopPending";
import ProviderLayout from "../../components/provider/ProviderLayout";

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

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
    </div>
  );

  if (!providerId) return <div className="p-6 text-red-500 font-bold bg-slate-900 h-screen">Error: Not Logged In</div>;

  // 1. No Shop Created Yet -> Show Create Shop Form
  if (!shop) return <AddShop />;

  // 2. Shop Created but Pending Approval -> Show Pending Screen
  if (shop.approvalStatus === "PENDING" || shop.approvalStatus === "REJECTED") {
      return <ShopPending status={shop.approvalStatus} />;
  }

  // 3. Shop Approved -> Show Full Dashboard (Navbar + Content)
  return (
    <ProviderLayout>
      {/* Passing 'shop' context allows child pages (Services/Orders) 
          to access shop ID without re-fetching 
      */}
      <Outlet context={{ shop }} />
    </ProviderLayout>
  );
};

export default ProviderDashboard;