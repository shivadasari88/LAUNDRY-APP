import { NavLink, useNavigate } from "react-router-dom";

const ProviderLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm("Logout from Provider Portal?")) {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🧺</span>
                        <h1 className="text-xl font-bold text-cyan-700">
                            Provider Portal
                        </h1>
                    </div>
                    
                    <nav className="flex items-center gap-2">
                        <NavLink 
                            to="orders" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-500 hover:bg-slate-100 hover:text-cyan-700"}`}
                        >
                            Orders
                        </NavLink>
                        
                        {/* ❌ REMOVED STATUS LINK (Moved to Customer) */}

                        <NavLink 
                            to="services" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-500 hover:bg-slate-100 hover:text-cyan-700"}`}
                        >
                            Services
                        </NavLink>
                        
                        <NavLink 
                            to="profile" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-500 hover:bg-slate-100 hover:text-cyan-700"}`}
                        >
                            Profile
                        </NavLink>

                        {/* ✅ LOGOUT BUTTON */}
                        <button 
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 border border-red-200 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-all text-sm"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
};

export default ProviderLayout;