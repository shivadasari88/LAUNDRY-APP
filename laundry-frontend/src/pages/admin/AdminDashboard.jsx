import { useEffect, useState } from "react";
import {
  getAllShops,
  approveShop,
  rejectShop
} from "../../api/adminApi";

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadShops = async () => {
    try {
      const res = await getAllShops();
      setShops(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const handleApprove = async (shopId) => {
    await approveShop(shopId);
    loadShops();
  };

  const handleReject = async (shopId) => {
    await rejectShop(shopId);
    loadShops();
  };

  if (loading) {
    return <div className="p-6">Loading shops...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">All Shops</h1>

      {shops.length === 0 && (
        <p className="text-slate-500">No shops found</p>
      )}

      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white p-6 rounded-xl shadow border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{shop.name}</h2>
                <p className="text-sm text-slate-600">{shop.address}</p>
                <p className="text-sm">📞 {shop.phone}</p>
                <p className="text-sm">
                  ⏰ {shop.openingHours} • 🚚 {shop.deliveryTime}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[shop.approvalStatus]}`}
              >
                {shop.approvalStatus}
              </span>
            </div>

            {/* ACTIONS ONLY FOR PENDING */}
            {shop.approvalStatus === "PENDING" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleApprove(shop.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(shop.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


