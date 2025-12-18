import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProviderDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    shopName: "",
    address: "",
    phone: ""
  });

  const loadShops = async () => {
    const res = await api.get(`/shops/provider/${user.id}`);
    setShops(res.data || []);
  };

  const addShop = async () => {
    await api.post("/shops/add", {
      ...form,
      providerId: user.id
    });
    loadShops();
  };

  useEffect(() => {
    loadShops();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Provider Dashboard</h1>

      <h3>Add New Shop</h3>
      <input placeholder="Shop Name"
        onChange={e => setForm({...form, shopName:e.target.value})} />
      <br /><br />
      <input placeholder="Address"
        onChange={e => setForm({...form, address:e.target.value})} />
      <br /><br />
      <input placeholder="Phone"
        onChange={e => setForm({...form, phone:e.target.value})} />
      <br /><br />
      <button onClick={addShop}>Add Shop</button>

      <hr />

      <h3>Your Shops</h3>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            <b>{shop.shopName}</b> — {shop.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

