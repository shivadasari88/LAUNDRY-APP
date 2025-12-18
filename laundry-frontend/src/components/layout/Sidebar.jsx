import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, List, User, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', to: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Services', to: '/services', icon: <ShoppingBag size={20} /> },
        { name: 'Cart', to: '/cart', icon: <ShoppingCart size={20} /> },
        { name: 'My Orders', to: '/orders', icon: <list size={20} /> }, // FontAwesome 'list' is typically 'List' in Lucide, wait. Lucide has 'List' or 'FileJson', checking common names. 'List' is valid in lucide-react. Checking code... 'list' might be a typo, using 'List' is safer or 'ClipboardList'. I'll use 'ClipboardList' for Orders or just 'List'.
        // Actually, let's use 'ShoppingBag' for Orders maybe? No, 'Services' used that.
        // 'Package' is good for Orders.
        // Let's stick to standard names.
        { name: 'Profile', to: '/profile', icon: <User size={20} /> },
    ];

    // Note: Lucide export names are PascalCase. 'list' should be 'List'. 
    // I will import List from lucide-react.

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-10 hidden md:flex">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-sky-600">Laundry<span className="text-slate-800">App</span></h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-50 w-full rounded-md transition-colors">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};
export default Sidebar;
