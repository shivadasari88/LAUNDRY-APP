import { NavLink } from "react-router-dom";

const ProviderLayout = ({ children }) => {
    return (
        // ✅ Added bg-gradient-to-br from-slate-900 to-indigo-950 for that deep blue look
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-slate-100 font-sans">
            
            {/* Header */}
            <header className="bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Provider Portal
                    </h1>
                    <nav className="flex gap-6">
                        <NavLink 
                            to="orders" 
                            className={({ isActive }) => 
                                `px-3 py-2 rounded-lg transition-all ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-white"}`
                            }
                        >
                            Orders
                        </NavLink>
                        <NavLink 
                            to="services"
                            className={({ isActive }) => 
                                `px-3 py-2 rounded-lg transition-all ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-white"}`
                            }
                        >
                            Services
                        </NavLink>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
};

export default ProviderLayout;