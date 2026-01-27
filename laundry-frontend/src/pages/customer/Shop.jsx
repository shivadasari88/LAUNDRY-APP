import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ItemList from '../../components/ItemList';
import ItemModal from '../../components/ItemModel';
import CartSidebar from '../../components/CartSidebar';
import { getShopById, getShopServices } from '../../api/customerApi'; 

const Shop = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const shopRes = await getShopById(shopId);
            setShop({
                ...shopRes.data,
                rating: shopRes.data.rating || 4.5,
                services: shopRes.data.serviceTypes?.map(s => s.serviceName) || []
            });

            const servicesRes = await getShopServices(shopId);
            const allItems = [];
            servicesRes.data.forEach(service => {
                service.items.forEach(item => {
                    const existingItem = allItems.find(i => i.name === item.itemName);
                    if (existingItem) {
                        existingItem.serviceTypes.push(service.serviceName);
                    } else {
                        allItems.push({
                            id: item.id,
                            name: item.itemName,
                            category: item.category,
                            price: item.price,
                            popular: item.popular,
                            serviceTypes: [service.serviceName] 
                        });
                    }
                });
            });
            setItems(allItems);
        } catch (error) { console.error("Error:", error); } 
        finally { setLoading(false); }
    };
    if (shopId) fetchData();
  }, [shopId]);

  const handleAddToCart = (itemData) => {
    const cartItem = {
      ...itemData,
      shopId: parseInt(shopId),
      shopName: shop?.name,
      price: itemData.totalPrice !== undefined ? itemData.totalPrice : (itemData.price || 0),
      ...(itemData.groupName && {
        items: itemData.items.map(subItem => ({ ...subItem, shopId: parseInt(shopId) }))
      })
    };
    addItemToCart(cartItem);
    setIsModalOpen(false);
    setIsCartOpen(true); 
  };

  if (loading || !shop) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="flex justify-between px-6 py-6 text-white bg-slate-800 sticky top-0 z-40 shadow-md">
        <div className="text-2xl font-bold">Uplift Wash</div>
        <div className="flex gap-4 items-center">
            <Link to="/home" className="px-4 py-2 border rounded-full">Back</Link>
            
            {/* ✅ CLEAN NAVBAR (Only Cart) */}
            <button onClick={() => setIsCartOpen(true)} className="px-4 py-2 bg-blue-600 rounded-full">Cart</button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-3xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
          <p className="opacity-80">{shop.description}</p>
        </div>
        <ItemList items={items} onItemSelect={(item) => { setSelectedItem(item); setIsModalOpen(true); }} />
      </main>

      {isModalOpen && selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
      )}

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} shopId={parseInt(shopId)} />
    </div>
  );
};

export default Shop;