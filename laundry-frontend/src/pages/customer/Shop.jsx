import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemList from '../../components/ItemList';
import ItemModal from '../../components/ItemModel';
import CartSidebar from '../../components/CartSidebar';
import { getShopById, getShopServices } from '../../api/customerApi';
import NotificationBell from '../../components/NotificationBell';

const Shop = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // Added cart state
  
  // FOR NOTIFICATIONS
  const userId = localStorage.getItem('userId') || 1;
  const userRole = 'CUSTOMER';

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

  // Add item to cart
  const handleAddToCart = (itemData) => {
    const cartItem = {
      ...itemData,
      id: Date.now(), // Unique ID for cart item
      shopId: parseInt(shopId),
      shopName: shop?.name,
      price: itemData.totalPrice !== undefined ? itemData.totalPrice : (itemData.price || 0),
      ...(itemData.groupName && {
        items: itemData.items.map(subItem => ({ ...subItem, shopId: parseInt(shopId) }))
      })
    };
    
    setCart(prevCart => [...prevCart, cartItem]);
    setIsModalOpen(false);
    setIsCartOpen(true); 
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.totalPrice || item.price || 0), 0);
  };

  // Handle order placed from CartSidebar
  const handleOrderPlaced = (orderId) => {
    // Clear cart after successful order
    setCart([]);
    setIsCartOpen(false);
    
    // Show success message
    alert(`Order #${orderId} placed successfully! Check notifications for updates.`);
  };

  if (loading || !shop) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="flex justify-between px-6 py-6 text-white bg-slate-800 sticky top-0 z-40 shadow-md">
        <div className="text-2xl font-bold">Uplift Wash</div>
        <div className="flex gap-4 items-center">
            <Link to="/home" className="px-4 py-2 border rounded-full">Back</Link>
            
            {/* NOTIFICATION BELL */}
            <NotificationBell userId={userId} userRole={userRole} />
            
            {/* CART BUTTON WITH COUNT */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="px-4 py-2 bg-blue-600 rounded-full flex items-center gap-2 relative"
            >
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-3xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
          <p className="opacity-80">{shop.description}</p>
        </div>
        <ItemList 
          items={items} 
          onItemSelect={(item) => { 
            setSelectedItem(item); 
            setIsModalOpen(true); 
          }} 
        />
      </main>

      {isModalOpen && selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={() => setIsModalOpen(false)} 
          onAddToCart={handleAddToCart} 
        />
      )}

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        shopId={parseInt(shopId)}
        cartItems={cart}
        totalAmount={calculateTotal()}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handleOrderPlaced}
      />
    </div>
  );
};

export default Shop;