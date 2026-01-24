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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!providerId) return <div className="p-6 text-red-600">Provider not logged in</div>;
  if (!shop) return <AddShop />;
  if (shop.approvalStatus === "PENDING") return <ShopPending />;

  // ✅ THIS IS THE MOST IMPORTANT LINE
  return (
    <ProviderLayout>
      <Outlet context={{ shop }} />
    </ProviderLayout>
  );
};

export default ProviderDashboard;
