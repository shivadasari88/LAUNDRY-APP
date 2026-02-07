import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Package, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartSidebar from './CartSidebar';
import NotificationDropdown from '../common/NotificationDropdown';

const CustomerLayout = () => {
    const location = useLocation();
    const { cartItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/home', label: 'Home', icon: Home },
        { path: '/orders', label: 'My Orders', icon: Package },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/home" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                                🫧
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Uplift
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`relative px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 group ${isActive(path)
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={18} className={isActive(path) ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'} />
                                    <span className="font-medium">{label}</span>
                                    {isActive(path) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <NotificationDropdown />
                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                            >
                                <ShoppingCart size={22} className="group-hover:text-blue-400 transition-colors" />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                    </span>
                                )}
                            </button>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/20 transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            <NotificationDropdown />
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-gray-400 hover:text-white"
                            >
                                <ShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[#0f172a] border-t border-white/10 px-4 py-4 space-y-2 absolute w-full left-0 shadow-2xl">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(path)
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="min-h-[calc(100vh-80px-300px)]">
                <Outlet context={{ setIsCartOpen }} />
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#0f172a] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-sm">
                                    🫧
                                </div>
                                <span className="text-xl font-bold text-white">Uplift</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Premium laundry services delivered to your doorstep. We care for your clothes so you can care for yourself.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Services</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Dry Cleaning</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Wash & Fold</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Ironing</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Stain Removal</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Company</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-600/20">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2024 Uplift Wash. All rights reserved.</p>
                        <div className="flex gap-6 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Global Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};

export default CustomerLayout;
