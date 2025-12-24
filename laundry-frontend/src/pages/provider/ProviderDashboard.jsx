import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProviderDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [items, setItems] = useState([]);

  const [serviceName, setServiceName] = useState("");
  const [itemForm, setItemForm] = useState({ itemName: "", price: "" });

  /* ---------------- LOAD SHOPS ---------------- */
  const loadShops = async () => {
    const res = await api.get(`/shops/provider/${user.id}`);
    setShops(res.data || []);
  };

  /* ---------------- LOAD SERVICES ---------------- */
  const loadServices = async (shopId) => {
    const res = await api.get(`/laundry/shop/${shopId}/services`);
    setServices(res.data || []);
    setSelectedService(null);
    setItems([]);
  };

  /* ---------------- LOAD ITEMS ---------------- */
  const loadItems = async (serviceId) => {
    const res = await api.get(`/laundry/service/${serviceId}/items`);
    setItems(res.data || []);
  };

  /* ---------------- ADD SERVICE ---------------- */
  const addService = async () => {
    if (!serviceName || !selectedShop) return;

    await api.post("/laundry/service", {
      serviceName,
      shopId: selectedShop.id
    });

    setServiceName("");
    loadServices(selectedShop.id);
  };

  /* ---------------- ADD ITEM ---------------- */
  const addItem = async () => {
    if (!itemForm.itemName || !itemForm.price || !selectedService) return;

    await api.post("/laundry/item", {
      itemName: itemForm.itemName,
      price: itemForm.price,
      serviceId: selectedService.id
    });

    setItemForm({ itemName: "", price: "" });
    loadItems(selectedService.id);
  };

  useEffect(() => {
    loadShops();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Provider Dashboard</h1>

      {/* ---------- SHOPS ---------- */}
      <h3>Your Shops</h3>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            <button onClick={() => {
              setSelectedShop(shop);
              loadServices(shop.id);
            }}>
              {shop.shopName}
            </button>
          </li>
        ))}
      </ul>

      {/* ---------- SERVICES ---------- */}
      {selectedShop && (
        <>
          <hr />
          <h3>Services for {selectedShop.shopName}</h3>

          <input
            placeholder="Service Name (Wash / Iron)"
            value={serviceName}
            onChange={e => setServiceName(e.target.value)}
          />
          <button onClick={addService}>Add Service</button>

          <ul>
            {services.map(service => (
              <li key={service.id}>
                <button onClick={() => {
                  setSelectedService(service);
                  loadItems(service.id);
                }}>
                  {service.serviceName}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ---------- ITEMS ---------- */}
      {selectedService && (
        <>
          <hr />
          <h3>
            Items for {selectedService.serviceName} ({selectedShop.shopName})
          </h3>

          <input
            placeholder="Item Name (Shirt / Pant)"
            value={itemForm.itemName}
            onChange={e => setItemForm({ ...itemForm, itemName: e.target.value })}
          />

          <input
            placeholder="Price (₹)"
            type="number"
            value={itemForm.price}
            onChange={e => setItemForm({ ...itemForm, price: e.target.value })}
          />

          <button onClick={addItem}>Add Item</button>

          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.itemName} — ₹{item.price}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
