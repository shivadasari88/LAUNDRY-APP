import React from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
    // Basic mobile implementation
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white border-b z-20 px-4 py-3 flex justify-between items-center">
                <div className="font-bold text-sky-600 text-xl">LaundryApp</div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="text-slate-600" />
                </button>
            </div>

            {/* Mobile Menu Overlay - Simplified for now */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-20 pt-16 px-4">
                    {/* Re-implementing simplified nav for mobile for this demo */}
                    <nav className="flex flex-col gap-4">
                        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2 border-b">Dashboard</NavLink>
                        <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className="p-2 border-b">Services</NavLink>
                        <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="p-2 border-b">Cart</NavLink>
                        <NavLink to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="p-2 border-b">My Orders</NavLink>
                        <NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="p-2 border-b">Profile</NavLink>
                    </nav>
                </div>
            )}

            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
