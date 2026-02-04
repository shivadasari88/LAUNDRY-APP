import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../../components/customer/ShopCard';
import FilterSection from '../../components/customer/FilterSection';
import api from '../../services/api';

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


  useEffect(() => {
    api.get('/customer/shops')
      .then(res => {
        setNearbyShops(res.data);
        setFilteredShops(res.data);
      })
      .catch(err => console.error(err));
  }, []);


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

  useEffect(() => {
    let filtered = [...nearbyShops];

    if (selectedService) {
      filtered = filtered.filter(shop =>
        shop.services?.some(
          service => service.name === selectedService
        )
      );
    }

    setFilteredShops(filtered);
  }, [selectedService, selectedCategory, selectedItem, nearbyShops]);

  const handleShopSelect = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 pb-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
          Find Laundry Shops Near You
        </h1>
        {userLocation ? (
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 text-blue-200">
            <span className="text-xl">📍</span>
            <div className="text-left leading-tight">
              <span className="font-medium text-sm">Location Detected</span>
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 rounded-full">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-transparent"></div>
            <span className="text-white/60 text-sm">Locating...</span>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Available Shops', value: nearbyShops.length, icon: '🏪' },
          { label: 'Services', value: `${services.length}+`, icon: '🧺' },
          { label: 'Avg. Rating', value: '4.8', icon: '⭐' },
          { label: 'Turnaround', value: '24h', icon: '⚡' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all group">
            <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="mb-12">
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
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {selectedService || selectedCategory || selectedItem ? 'Filtered Results' : 'Recommended Shops'}
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Showing {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'}
            </p>
          </div>

          {(selectedService || selectedCategory || selectedItem) && (
            <button
              onClick={() => {
                setSelectedService('');
                setSelectedCategory('');
                setSelectedItem('');
              }}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShops.map(shop => (
              <div
                key={shop.id}
                className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer h-full"
                onClick={() => handleShopSelect(shop.id)}
              >
                <ShopCard
                  shop={shop}
                  onClick={() => handleShopSelect(shop.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-3xl border border-dashed border-white/10">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-medium text-white mb-2">No shops found</h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto">We couldn't find any shops matching your criteria. Try adjusting your filters.</p>
            <button
              onClick={() => {
                setSelectedService('');
                setSelectedCategory('');
                setSelectedItem('');
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;