import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import ItemCard from '../components/ui/ItemCard'; // We might want a smaller list item style for cart, but ItemCard is fine or we create a list view.
// Requirement: "list of items with counters and specific info".
// ItemCard has counters. We can reuse it or make a simpler list item.
// Let's make a simpler list item here inline or a new component.
// I'll make a dedicated CartItem component inline for now or separate if complex.

const Cart = () => {
    const { cartItems, selectedShop, setShop, totalPrice, totalItems, clearCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    // Check if shop was passed via navigation state (from Services page)
    useEffect(() => {
        if (location.state?.shop) {
            setShop(location.state.shop);
        }
    }, [location.state, setShop]);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fade-in">
                <div className="p-6 bg-slate-100 rounded-full">
                    <ShoppingBag size={48} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-700">Your cart is empty</h2>
                <p className="text-slate-500">Looks like you haven't added any items yet.</p>
                <button
                    onClick={() => navigate('/services')}
                    className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    Browse Services
                </button>
            </div>
        );
    }

    const finalPrice = selectedShop
        ? (totalPrice * (selectedShop.basePriceMultiplier || 1)).toFixed(2)
        : totalPrice.toFixed(2);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 animate-fade-in">
            {/* Left Column: Shop & Items */}
            <div className="lg:col-span-2 space-y-6">

                {selectedShop ? (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                        <img src={selectedShop.image} alt={selectedShop.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">{selectedShop.name}</h2>
                            <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                                <MapPin size={16} />
                                <span>{selectedShop.distance} km away</span>
                            </div>
                            <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">Selected Partner</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800 text-sm">
                        Please select a shop from the Services page to see final pricing.
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-800">Cart Items ({totalItems})</h2>
                        <button onClick={clearCart} className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1">
                            <Trash2 size={16} /> Clear Cart
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {cartItems.map(item => (
                            <div key={item.id} className="p-4 flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                                    <p className="text-sm text-slate-500 capitalize">{item.category}</p>
                                    <div className="text-sky-600 font-bold mt-1">${item.price} <span className="text-slate-400 text-xs font-normal">/ item</span></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* We could reuse ItemCard controls, but simple text is fine here or just the ItemCard logic re-implemented simply */}
                                    {/* Since we have ItemCard which handles context, we might rely on it, but the design "List of Items" suggests a list view distinct from grid. */}
                                    {/* I will use the ItemCard component? No, it's designed as a card. Using controls here. */}
                                    {/* Actually I can just import useCart and call addToCart/removeFromCart. */}
                                    {/* But I need access to those functions inside the map. */}
                                    <CartItemControls item={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h2>
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span>Subtotal ({totalItems} items)</span>
                            <span className="font-medium">${totalPrice.toFixed(2)}</span>
                        </div>
                        {selectedShop && (
                            <div className="flex justify-between text-slate-500">
                                <span>Service Fee ({((selectedShop.basePriceMultiplier - 1) * 100).toFixed(0)}%)</span>
                                <span>+${(parseFloat(finalPrice) - totalPrice).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-800">
                            <span>Total</span>
                            <span>${finalPrice}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Pickup / Delivery Details</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" placeholder="+1 234 567 890" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <textarea className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" rows="3" placeholder="123 Main St, Apt 4B"></textarea>
                        </div>

                        <button className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 mt-4">
                            Place Order <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CartItemControls = ({ item }) => {
    const { addToCart, removeFromCart } = useCart();
    return (
        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
            <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-red-500 font-bold">-</button>
            <span className="font-bold text-slate-800 w-4 text-center">{item.count}</span>
            <button onClick={() => addToCart(item, null)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-green-500 font-bold">+</button>
        </div>
    )
}

export default Cart;
