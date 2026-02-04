import { useState } from "react";
import { createShop } from "../../api/shopApi";

const AddShop = () => {
    // ✅ Get provider from login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const providerId = storedUser?.id;

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        description: "",
        openingHours: "",
        deliveryTime: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        if (!providerId) {
            alert("Provider not logged in");
            return;
        }

        try {

            const payload = {
                ...form
            };

            console.log("Creating shop:", payload);

            await createShop(payload);

            alert("Shop created successfully. Waiting for admin approval.");
        } catch (error) {
            console.error(error);
            alert("Failed to create shop");
        }
    };

    // ✅ RETURN MUST BE INSIDE FUNCTION
    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Add Shop</h2>

            <input
                name="name"
                placeholder="Shop Name"
                value={form.name}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 border rounded-lg"
            />

            <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 border rounded-lg"
            />

            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 border rounded-lg"
            />

            <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 border rounded-lg"
            />

            <input
                name="openingHours"
                placeholder="Opening Hours (e.g. 9 AM - 9 PM)"
                value={form.openingHours}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-3 border rounded-lg"
            />

            <input
                name="deliveryTime"
                placeholder="Delivery Time (e.g. 24 Hours)"
                value={form.deliveryTime}
                onChange={handleChange}
                className="w-full mb-6 px-4 py-3 border rounded-lg"
            />

            <div className="flex justify-end">
                <button
                    onClick={handleCreate}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddShop;
