import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import ItemCard from '../components/ui/ItemCard';
import ShopCard from '../components/ui/ShopCard';
import { services, items, shops } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Services = () => {
    const [activeService, setActiveService] = useState('washing');
    const [searchQuery, setSearchQuery] = useState('');
    const [showShops, setShowShops] = useState(false);
    const { totalItems } = useCart();

    // Filter items based on active service and search query
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesService = item.category === activeService;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesService && matchesSearch;
        });
    }, [activeService, searchQuery]);

    // Sort shops by distance
    const sortedShops = useMemo(() => {
        return [...shops].sort((a, b) => a.distance - b.distance);
    }, []);

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4 sticky top-16 md:top-24 z-10 transition-all">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for clothes..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-lg text-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {services.map(service => (
                        <button
                            key={service.id}
                            onClick={() => setActiveService(service.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeService === service.id
                                    ? 'bg-sky-600 text-white shadow-md shadow-sky-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                    No items found.
                </div>
            )}

            {/* Get Shops Action */}
            <div className={`fixed bottom-0 left-0 right-0 md:relative md:bg-transparent p-4 transition-transform duration-300 md:transform-none z-20 ${showShops ? 'translate-y-full md:translate-y-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto hidden md:block' : ''}`}>
                {/* Using this block just to reserve space or show logic? 
             Actually, the design calls for a button that reveals shops. 
             If on mobile, maybe it's a floating action button? 
             Let's put the button at the bottom of the items list or fixed if items effectively scroll.
         */}
            </div>

            {/* Floating Action Button / Sticky Footer for "Get Shops" */}
            {!showShops && (
                <div className="fixed bottom-6 right-6 md:hidden z-30">
                    <button
                        onClick={() => setShowShops(true)}
                        disabled={totalItems === 0}
                        className={`flex items-center gap-2 px-6 py-4 rounded-full shadow-lg font-bold transition-all ${totalItems > 0
                                ? 'bg-sky-600 text-white hover:bg-sky-700 cursor-pointer animate-bounce-subtle'
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        <MapPin size={20} />
                        Get Shops {totalItems > 0 && `(${totalItems})`}
                    </button>
                </div>
            )}

            {/* Since the prompt asks for "Get Shops" button that reveals list... */}
            <div className="flex justify-center mt-8">
                {!showShops && (
                    <button
                        onClick={() => setShowShops(true)}
                        disabled={totalItems === 0}
                        className={`hidden md:flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold shadow-md transition-all ${totalItems > 0
                                ? 'bg-sky-600 text-white hover:bg-sky-700 transform hover:scale-105'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <MapPin size={20} />
                        Find Nearby Shops {totalItems > 0 && `(${totalItems} items)`}
                    </button>
                )}
            </div>

            {/* Shops Section - Animated Reveal */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showShops ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Available Shops</h2>
                    <button onClick={() => setShowShops(false)} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm">
                        Hide <ChevronDown className="rotate-180" size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {totalItems === 0 ? (
                        <div className="p-8 text-center bg-yellow-50 rounded-xl text-yellow-700 border border-yellow-100">
                            Please add items to your cart to see accurate pricing from shops.
                        </div>
                    ) : (
                        sortedShops.map(shop => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;
