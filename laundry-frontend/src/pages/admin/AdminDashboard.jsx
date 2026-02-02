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
      alert("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  // Logout
  const handleLogout = () => {
    navigate("/login");
  };

  const handleApprove = async (shopId) => {
    await approveShop(shopId);
    loadShops();
  };

  const handleReject = async (shopId) => {
    await rejectShop(shopId);
    loadShops();
  };

  if (loading) {
    return <div className="p-6 text-white">Loading shops...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            Admin Dashboard - All Shops
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 rounded-xl font-semibold transition-all"
          >
            Logout
          </button>
        </div>

        {shops.length === 0 && (
          <p className="text-indigo-300/60 text-center py-10">
            No shops found
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              {/* SHOP INFO */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{shop.name}</h2>
                  <p className="text-sm text-indigo-200/70">
                    📍 {shop.address}
                  </p>
                  <p className="text-sm text-indigo-200/70">
                    📞 {shop.phone}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase
                    ${
                      shop.approvalStatus === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : shop.approvalStatus === "APPROVED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {shop.approvalStatus}
                </span>
              </div>

              {/* DETAILS WITH ICONS */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 my-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕒</span>
                  <div>
                    <p className="text-xs text-indigo-300/50 uppercase">
                      Opening Hours
                    </p>
                    <p className="text-sm font-medium text-indigo-100">
                      {shop.openingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🚚</span>
                  <div>
                    <p className="text-xs text-indigo-300/50 uppercase">
                      Delivery Time
                    </p>
                    <p className="text-sm font-medium text-indigo-100">
                      {shop.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-auto space-y-3">
                {/* View Details */}
                <button
                  onClick={() => navigate(`/admin/shop/${shop.id}`)}
                  className="w-full bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/40 py-2 rounded-xl font-semibold transition-all"
                >
                  View Details
                </button>

                {/* Approve / Reject */}
                {shop.approvalStatus === "PENDING" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(shop.id)}
                      className="flex-1 bg-green-500 hover:bg-green-400 text-white py-2 rounded-xl font-semibold"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(shop.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold"
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
    </div>
  );
};

export default AdminDashboard;
