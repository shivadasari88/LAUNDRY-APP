import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
          Admin Dashboard - All Shops
        </h1>

        {shops.length === 0 && (
          <p className="text-indigo-300/60 text-center py-10">No shops found</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {shop.name}
                  </h2>
                  <p className="text-indigo-200/70 text-sm flex items-center gap-2">
                    📍 {shop.address}
                  </p>
                  <p className="text-indigo-200/70 text-sm">📞 {shop.phone}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${shop.approvalStatus === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : shop.approvalStatus === "APPROVED"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                  >
                    {shop.approvalStatus}
                  </span>
                  <button
                    onClick={() => navigate(`/admin/shop/${shop.id}`)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all border border-white/10"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 my-4">
                <div>
                  <p className="text-xs text-indigo-300/50 uppercase">Opening Hours</p>
                  <p className="text-sm font-medium text-indigo-100">{shop.openingHours}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-300/50 uppercase">Delivery Time</p>
                  <p className="text-sm font-medium text-indigo-100">{shop.deliveryTime}</p>
                </div>
              </div>

              {/* ACTIONS ONLY FOR PENDING */}
              {shop.approvalStatus === "PENDING" && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleApprove(shop.id)}
                    className="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-green-500/20"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(shop.id)}
                    className="flex-1 px-4 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 rounded-xl font-semibold transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


