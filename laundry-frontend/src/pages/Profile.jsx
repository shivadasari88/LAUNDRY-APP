import React from 'react';
import { User, Mail, Phone, MapPin, Edit2, LogOut } from 'lucide-react';

const Profile = () => {
    // Mock User Data
    const user = {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Maple Street, Springfield, IL, 62704',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=0284c7&color=fff&size=128'
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-sky-400 to-blue-500"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white" />
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                            <p className="text-slate-500">Member since Jan 2024</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><Mail size={18} /></div>
                                    {user.email}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><Phone size={18} /></div>
                                    {user.phone}
                                </div>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Home Address</label>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><MapPin size={18} /></div>
                                    {user.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 p-6 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 mb-4">Account Settings</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:text-red-600 transition-colors flex items-center justify-between group">
                            <span className="font-medium">Sign Out</span>
                            <LogOut size={18} className="text-slate-400 group-hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
