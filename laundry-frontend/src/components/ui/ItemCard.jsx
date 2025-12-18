import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ItemCard = ({ item }) => {
    const { cartItems, addToCart, removeFromCart, selectedShop } = useCart();

    // Find if item is in cart
    const cartItem = cartItems.find(i => i.id === item.id);
    const count = cartItem ? cartItem.count : 0;

    // For adding, we need a "selected shop" concept implicitly or explicitly.
    // The requirement says "Shop Cards... calculated Total Price for items currently in cart".
    // This implies we pick items FIRST, then see shops? Or pick shop then items?
    // "Action: A 'Get Shops' button that, when clicked, reveals a list of shops sorted by distance."
    // "Shop Cards: ... calculated Total Price for items currently in cart."
    // This strongly implies: Select Items -> Click Get Shops -> See Shops with prices based on cart.
    // So when adding items, we are not yet attached to a shop, OR we are just building a "basket"
    // and the shop applies its multiplier or base price later.
    // WE WILL ASSUME: Items have base price. Shop cards show "Total Price" = Cart Total * Shop Multiplier (or just Cart Total if prices are fixed).
    // Let's assume prices are fixed per item for simplicity, unless we want to do dynamic pricing.
    // Requirement: "calculated Total Price for items currently in cart".

    const handleAdd = () => {
        addToCart(item, selectedShop); // Pass selectedShop if we have one, or null.
    };

    const handleRemove = () => {
        removeFromCart(item.id);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700">
                    ${item.price}
                </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-slate-500 text-sm capitalize mb-4">{item.category}</p>

                <div className="mt-auto">
                    {count === 0 ? (
                        <button
                            onClick={handleAdd}
                            className="w-full py-2 bg-sky-50 text-sky-600 font-medium rounded-lg hover:bg-sky-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Add
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-1">
                            <button onClick={handleRemove} className="p-2 bg-white rounded-md shadow-sm text-slate-600 hover:text-red-500 transition-colors">
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-slate-800">{count}</span>
                            <button onClick={handleAdd} className="p-2 bg-white rounded-md shadow-sm text-slate-600 hover:text-green-500 transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
