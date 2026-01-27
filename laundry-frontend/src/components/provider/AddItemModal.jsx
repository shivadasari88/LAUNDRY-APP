import { useState } from "react";
import { addItem } from "../../api/catalogApi";

const AddItemModal = ({ serviceTypeId, onAdded }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({
        itemName: "",
        category: "",
        price: "",
        popular: false
    });

    const submit = async () => {
        if (!item.itemName || !item.price) return alert("Item name & price required");

        setLoading(true);
        try {
            // Payload matches ItemRequest DTO
            await addItem({
                serviceTypeId: serviceTypeId,
                itemName: item.itemName,
                category: item.category,
                price: Number(item.price),
                popular: item.popular
            });

            setOpen(false);
            setItem({ itemName: "", category: "", price: "", popular: false });
            onAdded();
        } catch (error) {
            console.error(error);
            alert("Failed to add item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-indigo-300 border border-slate-600 rounded-lg transition-colors"
            >
                + Add Item
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-6">Add Item</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 uppercase font-bold">Item Name</label>
                                <input
                                    placeholder="e.g. Shirt"
                                    className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    onChange={(e) => setItem({ ...item, itemName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1 uppercase font-bold">Category</label>
                                    <input
                                        placeholder="e.g. Men"
                                        className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setItem({ ...item, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1 uppercase font-bold">Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        onChange={(e) => setItem({ ...item, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg bg-slate-900/50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                    onChange={(e) => setItem({ ...item, popular: e.target.checked })}
                                />
                                <span className="text-slate-300">Mark as Popular</span>
                            </label>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
                                <button onClick={() => setOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button onClick={submit} disabled={loading} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
                                    {loading ? "Saving..." : "Save Item"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddItemModal;