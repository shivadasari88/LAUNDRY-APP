import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Edit, Save, Camera } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [isEditing, setIsEditing] = useState(false);

    // Mock user details if missing
    const userDetails = {
        name: user.username || user.name || "John Doe",
        email: user.email || "john.doe@example.com",
        phone: user.phone || "+91 98765 43210",
        address: user.address || "123, Green Park, Hyderabad",
        role: user.role || "CUSTOMER",
        memberSince: "Jan 2024"
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
                        <div className="relative mb-6 group cursor-pointer">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-1">
                                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
                                    <span className="text-4xl">😎</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{userDetails.name}</h2>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                            {userDetails.role}
                        </span>

                        <div className="w-full mt-6 pt-6 border-t border-white/5 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Member Since</span>
                                <span className="text-white font-medium">{userDetails.memberSince}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Orders</span>
                                <span className="text-white font-medium">12</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-2 space-y-6">
                    {/* pERSONAL INFO */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Personal Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-400 hover:text-white transition-all duration-300"
                            >
                                {isEditing ? <Save size={20} /> : <Edit size={20} />}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Full Name</p>
                                    <p className="text-white font-medium text-lg">{userDetails.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Email Address</p>
                                    <p className="text-white font-medium text-lg">{userDetails.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                                    <Phone size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                                    <p className="text-white font-medium text-lg">{userDetails.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Default Address</p>
                                    <p className="text-white font-medium text-lg">{userDetails.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
