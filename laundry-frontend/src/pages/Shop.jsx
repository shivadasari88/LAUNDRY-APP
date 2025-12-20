// pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ShopHeader from '../components/ShopHeader';
import ItemList from '../components/ItemList';
import ItemModal from '../components/ItemModel';
import CartSidebar from '../components/CartSidebar';

const Shop = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItemToCart } = useCart();

  // Mock data for shop
  useEffect(() => {
    // In real app, fetch shop data from API
    const mockShop = {
      id: parseInt(shopId),
      name: 'Quick Clean Laundry',
      address: '123 Main St, City',
      rating: 4.5,
      services: ['Washing', 'Ironing', 'Dry Cleaning'],
      openingHours: '9 AM - 8 PM'
    };
    setShop(mockShop);

    // Mock items
    const mockItems = [
      { id: 1, name: 'Cotton Shirt', category: 'Men', price: 30, serviceTypes: ['Washing', 'Ironing'] },
      { id: 2, name: 'Jeans', category: 'Men', price: 40, serviceTypes: ['Washing'] },
      { id: 3, name: 'Silk Saree', category: 'Women', price: 100, serviceTypes: ['Dry Cleaning'] },
      { id: 4, name: 'Woolen Jacket', category: 'Men', price: 150, serviceTypes: ['Dry Cleaning'] },
      { id: 5, name: 'Bedsheet', category: 'Home', price: 80, serviceTypes: ['Washing'] },
      { id: 6, name: 'Cotton Kurta', category: 'Men', price: 50, serviceTypes: ['Washing', 'Ironing'] },
    ];
    setItems(mockItems);
  }, [shopId]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (itemData) => {
  const cartItem = {
    ...itemData,
    shopId: parseInt(shopId),
    shopName: shop?.name,
    // Add shopId to each item in group if it's a group
    ...(itemData.groupName && {
      items: itemData.items.map(subItem => ({
        ...subItem,
        shopId: parseInt(shopId)
      }))
    })
  };
  
  console.log('Adding to cart:', cartItem); // Debug log
  addItemToCart(cartItem);
  setIsModalOpen(false);
};

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(items.map(item => item.category))];

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader 
        shop={shop} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search items (e.g., shirt, jeans, saree)"
                className="w-full p-3 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-3 border rounded-lg"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ItemList 
          items={filteredItems} 
          onItemSelect={handleItemSelect} 
        />

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No items found. Try a different search.</p>
          </div>
        )}
      </div>

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
      />
    </div>
  );
};

export default Shop;