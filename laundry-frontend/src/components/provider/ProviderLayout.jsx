import { NavLink } from "react-router-dom";

const ProviderLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <header className="bg-slate-800 border-b border-white/10 sticky top-0 z-30 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Provider Portal
                    </h1>
                    <nav className="flex gap-4">
                        <NavLink 
                            to="orders" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            Orders
                        </NavLink>
                        
                        {/* ✅ RENAMED TO 'STATUS' */}
                        <NavLink 
                            to="status" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            <span>📊</span> Status
                        </NavLink>

                        <NavLink 
                            to="services" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            Services
                        </NavLink>
                        
                        <NavLink 
                            to="profile" 
                            className={({ isActive }) => `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                        >
                            Profile
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
};

export default ProviderLayout;