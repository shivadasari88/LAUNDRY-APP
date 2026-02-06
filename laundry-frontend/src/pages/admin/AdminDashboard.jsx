import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllShops,
  approveShop,
  rejectShop
} from "../../api/adminApi";

const AdminDashboard = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch shops
  const loadShops = async () => {
    try {
      const res = await getAllShops();
      setShops(res.data);
    } catch (err) {
      console.error(err);
      // alert("Failed to load shops");
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
    return <div className="text-white">Loading shops...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-indigo-300/60 mt-1">Manage and monitor all laundry shops</p>
        </div>
      </div>

      {shops.length === 0 && (
        <p className="text-indigo-300/60 py-10">No shops found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col group"
          >
            {/* SHOP INFO */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{shop.name}</h3>
                <p className="text-sm text-indigo-200/50 mt-1">
                  📍 {shop.address}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                  ${shop.approvalStatus === "PENDING"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    : shop.approvalStatus === "APPROVED"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
              >
                {shop.approvalStatus}
              </span>
            </div>

            {/* DETAILS */}
            <div className="space-y-3 my-4">
              <div className="flex items-center gap-3 text-sm text-indigo-200/70">
                <span>📞</span> {shop.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-indigo-200/70">
                <span>🕒</span> {shop.openingHours}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
              <button
                onClick={() => navigate(`/admin/shop/${shop.id}`)}
                className="w-full bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-white border border-white/5 py-2 rounded-xl font-medium transition-all text-sm"
              >
                View Details
              </button>

              {shop.approvalStatus === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(shop.id)}
                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 py-2 rounded-xl font-medium text-sm transition-all"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(shop.id)}
                    className="flex-1 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 py-2 rounded-xl font-medium text-sm transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
