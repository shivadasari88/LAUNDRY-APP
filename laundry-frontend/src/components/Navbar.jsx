import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full flex items-center justify-between px-6 md:px-10 py-6 text-white bg-slate-900 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Uplift Wash
            </div>
            <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
                <Link
                    to="/home"
                    className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200"
                >
                    Home
                </Link>
                <Link
                    to="/profile"
                    className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
                >
                    Profile
                </Link>
                <Link
                    to="/orders"
                    className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
                >
                    My Orders
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
