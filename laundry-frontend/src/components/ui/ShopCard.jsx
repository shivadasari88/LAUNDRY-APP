import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ShopCard = ({ shop }) => {
    const navigate = useNavigate();
    const { totalPrice } = useCart(); // We use addToCart to set the shop when "booking" but logic changed to navigate

    // Calculate price for this shop (assuming multiplier logic or just base total)
    // Simple version: Total Price * Multiplier
    const finalPrice = (totalPrice * (shop.basePriceMultiplier || 1)).toFixed(2);

    const handleSelectShop = () => {
        navigate('/cart', { state: { shop } });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            <div className="w-full md:w-48 h-48 md:h-auto relative">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-800">{shop.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-slate-700">{shop.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                        <MapPin size={16} />
                        <span>{shop.distance} km away</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div>
                        <p className="text-xs text-slate-400 font-medium uppercase">Est. Total</p>
                        <p className="text-xl font-bold text-sky-600">${finalPrice}</p>
                    </div>
                    <button
                        onClick={handleSelectShop}
                        className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        Book Now <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;
