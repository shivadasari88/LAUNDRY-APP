import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, CheckCircle, XCircle, LogOut, Store } from "lucide-react";

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any auth tokens if needed
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path
            ? "bg-indigo-500/20 text-white border-r-2 border-indigo-400"
            : "text-indigo-300/60 hover:text-white hover:bg-white/5";
    };

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white font-sans selection:bg-indigo-500/30">
            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/5 bg-[#0f172a] flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
                        <span className="text-2xl">🛡️</span> Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 py-6 space-y-1">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${isActive("/admin")}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <div className="px-6 py-4">
                        <p className="text-xs font-bold text-indigo-500/40 uppercase tracking-widest mb-2">Shop Management</p>
                    </div>

                    <Link
                        to="/admin/approvedShops"
                        className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${isActive("/admin/approvedShops")}`}
                    >
                        <CheckCircle size={20} />
                        <span className="font-medium">Approved Shops</span>
                    </Link>

                    <Link
                        to="/admin/rejectedShops"
                        className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 ${isActive("/admin/rejectedShops")}`}
                    >
                        <XCircle size={20} />
                        <span className="font-medium">Rejected Shops</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
