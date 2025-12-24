import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShopCard from '../../components/ShopCard';
import FilterSection from '../../components/FilterSection';

const Home = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [nearbyShops, setNearbyShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Mock data for services, categories, items
  const services = [
    { id: 1, name: 'Washing', icon: '🧺' },
    { id: 2, name: 'Dry Cleaning', icon: '🧼' },
    { id: 3, name: 'Ironing', icon: '♨️' },
    { id: 4, name: 'Washing + Ironing', icon: '🧺♨️' }
  ];

  const categories = [
    { id: 1, name: 'Men', icon: '👨' },
    { id: 2, name: 'Women', icon: '👩' },
    { id: 3, name: 'Kids', icon: '👶' },
    { id: 4, name: 'Home Furnishing', icon: '🏠' }
  ];

  const items = [
    { id: 1, name: 'Shirt', icon: '👔' },
    { id: 2, name: 'Pant', icon: '👖' },
    { id: 3, name: 'Saree', icon: '🥻' },
    { id: 4, name: 'Jacket', icon: '🧥' },
    { id: 5, name: 'Bedsheet', icon: '🛏️' },
    { id: 6, name: 'Curtain', icon: '🪟' }
  ];

  // Mock shop data
  const allShops = [
    { id: 1, name: 'Quick Clean', distance: '0.5 km', services: ['Washing', 'Ironing'], rating: 4.5, deliveryTime: '1-2 hours' },
    { id: 2, name: 'Dry Clean Pro', distance: '1.2 km', services: ['Dry Cleaning'], rating: 4.2, deliveryTime: '24 hours' },
    { id: 3, name: 'Premium Laundry', distance: '2.1 km', services: ['Washing', 'Dry Cleaning', 'Ironing'], rating: 4.8, deliveryTime: 'Same day' },
    { id: 4, name: 'Express Wash', distance: '0.8 km', services: ['Washing'], rating: 4.0, deliveryTime: '2-3 hours' },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use mock location if denied
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);

  // Filter shops based on selections
  useEffect(() => {
    let filtered = [...allShops];
    
    if (selectedService) {
      filtered = filtered.filter(shop => 
        shop.services.includes(selectedService)
      );
    }
    
    // Add more filtering logic for category and items if needed
    
    setFilteredShops(filtered);
    setNearbyShops(allShops); // In real app, sort by distance
  }, [selectedService, selectedCategory, selectedItem]);

  const handleShopSelect = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      {/* Navbar - Updated to match theme */}
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-6 text-white">
        <div className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Uplift Wash
        </div>
        <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            Profile
          </Link>
          <Link
            to="/orders"
            className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            My Orders
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-6 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            Find Laundry Shops Near You
          </h1>
          {userLocation ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <p className="text-white/90 font-medium">Location loaded successfully</p>
                <p className="text-white/60 text-sm">Finding best laundry services near you</p>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <p className="text-white/70">Loading your location...</p>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Available Shops</p>
            <p className="text-2xl font-bold text-white">{allShops.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Services</p>
            <p className="text-2xl font-bold text-white">{services.length}+</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Avg. Rating</p>
            <p className="text-2xl font-bold text-white">4.4⭐</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Fastest Delivery</p>
            <p className="text-2xl font-bold text-white">1-2 hrs</p>
          </div>
        </div>

        {/* Filter Section - You'll need to update FilterSection component too */}
        <div className="mb-8">
          <FilterSection
            services={services}
            categories={categories}
            items={items}
            selectedService={selectedService}
            selectedCategory={selectedCategory}
            selectedItem={selectedItem}
            onServiceSelect={setSelectedService}
            onCategorySelect={setSelectedCategory}
            onItemSelect={setSelectedItem}
          />
        </div>

        {/* Shops Section */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {selectedService || selectedCategory || selectedItem 
                  ? `Filtered Shops` 
                  : '📍 Nearby Shops'}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {selectedService || selectedCategory || selectedItem 
                  ? `${filteredShops.length} shops match your criteria` 
                  : 'Sorted by distance from your location'}
              </p>
            </div>
            
            {selectedService || selectedCategory || selectedItem ? (
              <button
                onClick={() => {
                  setSelectedService('');
                  setSelectedCategory('');
                  setSelectedItem('');
                }}
                className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                ✕ Clear Filters
              </button>
            ) : null}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(selectedService || selectedCategory || selectedItem ? filteredShops : nearbyShops).map(shop => (
              <div 
                key={shop.id} 
                className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                onClick={() => handleShopSelect(shop.id)}
              >
                <ShopCard
                  shop={shop}
                  onClick={() => handleShopSelect(shop.id)}
                />
              </div>
            ))}
          </div>

          {(selectedService || selectedCategory || selectedItem) && filteredShops.length === 0 && (
            <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 mt-6">
              <div className="text-7xl mb-6">🔍</div>
              <p className="text-white/90 text-xl font-medium mb-2">No shops found for your selection</p>
              <p className="text-white/70 mb-6">Try different filters or check back later</p>
              <button
                onClick={() => {
                  setSelectedService('');
                  setSelectedCategory('');
                  setSelectedItem('');
                }}
                className="px-6 py-3 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
              >
                View All Shops
              </button>
            </div>
          )}

          {!selectedService && !selectedCategory && !selectedItem && nearbyShops.length === 0 && (
            <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10">
              <div className="text-7xl mb-6">🏪</div>
              <p className="text-white/90 text-xl font-medium mb-2">No nearby shops found</p>
              <p className="text-white/70 mb-6">Try expanding your search area or check back later</p>
            </div>
          )}

          {/* Load More Button */}
          {nearbyShops.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 rounded-full bg-white/10 border-2 border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300">
                Load More Shops
              </button>
            </div>
          )}
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
            <Link to="/about" className="hover:text-white transition-colors hover:underline">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors hover:underline">Contact</Link>
            <Link to="/privacy" className="hover:text-white transition-colors hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors hover:underline">Terms</Link>
            <Link to="/faq" className="hover:text-white transition-colors hover:underline">FAQ</Link>
            <Link to="/support" className="hover:text-white transition-colors hover:underline">Support</Link>
          </div>
        </div>
        <div className="text-center mt-6 text-white/50 text-xs">
          <p>Simplifying laundry services worldwide • One wash at a time</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;