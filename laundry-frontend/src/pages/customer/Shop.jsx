import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ShopHeader from '../../components/ShopHeader';
import ItemList from '../../components/ItemList';
import ItemModal from '../../components/ItemModel';
import CartSidebar from '../../components/CartSidebar';

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
      address: '123 Main St, New York, NY 10001',
      rating: 4.5,
      services: ['Washing', 'Ironing', 'Dry Cleaning'],
      openingHours: '9 AM - 8 PM',
      deliveryTime: '1-2 hours',
      phone: '+1 (555) 123-4567',
      description: 'Professional laundry service with quick turnaround time and premium quality.'
    };
    setShop(mockShop);

    // Mock items
    const mockItems = [
      { id: 1, name: 'Cotton Shirt', category: 'Men', price: 30, serviceTypes: ['Washing', 'Ironing'], popular: true },
      { id: 2, name: 'Jeans', category: 'Men', price: 40, serviceTypes: ['Washing'], popular: true },
      { id: 3, name: 'Silk Saree', category: 'Women', price: 100, serviceTypes: ['Dry Cleaning'], popular: false },
      { id: 4, name: 'Woolen Jacket', category: 'Men', price: 150, serviceTypes: ['Dry Cleaning'], popular: true },
      { id: 5, name: 'Bedsheet', category: 'Home', price: 80, serviceTypes: ['Washing'], popular: false },
      { id: 6, name: 'Cotton Kurta', category: 'Men', price: 50, serviceTypes: ['Washing', 'Ironing'], popular: true },
      { id: 7, name: 'Formal Trousers', category: 'Men', price: 45, serviceTypes: ['Washing', 'Ironing'], popular: false },
      { id: 8, name: 'Designer Dress', category: 'Women', price: 120, serviceTypes: ['Dry Cleaning'], popular: true },
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

  if (!shop) return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading shop details...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-6 text-white">
        <div className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Uplift Wash
        </div>
        <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
          <a
            href="/"
            className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            ← Back to Home
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center gap-2"
          >
            <span>🛒</span>
            View Cart
          </button>
        </nav>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{shop.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-white font-semibold">{shop.rating}</span>
                  <span className="text-white/70">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-300">📍</span>
                  <span className="text-white/90">{shop.address}</span>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 border border-white/10">
              <p className="text-white font-semibold">🕐 {shop.openingHours}</p>
              <p className="text-white/70 text-sm mt-1">Open now • Delivery: {shop.deliveryTime}</p>
            </div>
          </div>
          
          <p className="text-white/80 mb-6">{shop.description}</p>
          
          <div className="flex flex-wrap gap-3">
            {shop.services.map((service, index) => (
              <span key={index} className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 border border-blue-400/30">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Browse Items</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Search Items</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items (e.g., shirt, jeans, saree)"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">🔍</span>
              </div>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Filter by Category</label>
              <div className="relative">
                <select
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="" className="bg-gray-900">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                  <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Total Items</p>
            <p className="text-2xl font-bold text-white">{items.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Categories</p>
            <p className="text-2xl font-bold text-white">{categories.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Popular Items</p>
            <p className="text-2xl font-bold text-white">{items.filter(item => item.popular).length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Starting at</p>
            <p className="text-2xl font-bold text-white">₹{Math.min(...items.map(item => item.price))}</p>
          </div>
        </div>

        {/* Items List */}
<div className="mb-8">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-2xl font-bold text-white">
      {filterCategory ? `${filterCategory} Items` : 'All Items'}
      <span className="text-white/70 text-lg ml-2">({filteredItems.length})</span>
    </h3>
    {filterCategory && (
      <button
        onClick={() => setFilterCategory('')}
        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
      >
        Clear Filter
      </button>
    )}
  </div>

  {filteredItems.length > 0 ? (
    // REMOVE the grid wrapper here - ItemList already has its own grid
    <ItemList 
      items={filteredItems} 
      onItemSelect={handleItemSelect} 
    />
  ) : (
    <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10">
      <div className="text-7xl mb-6">🔍</div>
      <p className="text-white/90 text-xl font-medium mb-2">No items found</p>
      <p className="text-white/70 mb-6">Try a different search or category</p>
      <button
        onClick={() => {
          setSearchTerm('');
          setFilterCategory('');
        }}
        className="px-6 py-3 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
      >
        View All Items
      </button>
    </div>
  )}
</div>

        {/* Services Info */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">🧺</div>
              <h4 className="text-xl font-bold text-white mb-2">Washing</h4>
              <p className="text-white/70">Professional cleaning with eco-friendly detergents</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">♨️</div>
              <h4 className="text-xl font-bold text-white mb-2">Ironing</h4>
              <p className="text-white/70">Expert ironing for crisp, professional results</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">🧼</div>
              <h4 className="text-xl font-bold text-white mb-2">Dry Cleaning</h4>
              <p className="text-white/70">Specialized care for delicate fabrics</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-8 border-t border-white/10 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <div className="mb-4 md:mb-0">
            <p className="text-xl font-bold text-white mb-2">Uplift Wash</p>
            <p>© 2024 Uplift Wash. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="/about" className="hover:text-white transition-colors hover:underline">About</a>
            <a href="/contact" className="hover:text-white transition-colors hover:underline">Contact</a>
            <a href="/privacy" className="hover:text-white transition-colors hover:underline">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors hover:underline">Terms</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
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