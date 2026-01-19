// src/components/provider/ProviderHeader.jsx
import { useState } from 'react';

const ProviderHeader = ({ shopName, shopId, activeTab, onTabChange }) => {
  const [notifications] = useState(5);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'communication', label: 'Messages', icon: '🗣️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{shopName}</h1>
              <p className="text-white/70 text-sm">Provider ID: {shopId}</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Online
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                Open • 9AM-8PM
              </span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">SP</span>
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-white font-medium">Service Provider</div>
                  <div className="text-white/70 text-sm">Quick Clean</div>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl border border-white/10 shadow-2xl py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-white hover:bg-white/10">
                    👤 My Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-white hover:bg-white/10">
                    ⚙️ Account Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-white hover:bg-white/10">
                    📱 Switch to Mobile
                  </a>
                  <div className="border-t border-white/10 my-2"></div>
                  <a href="/logout" className="block px-4 py-2 text-red-400 hover:bg-red-500/20">
                    🚪 Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ProviderHeader;