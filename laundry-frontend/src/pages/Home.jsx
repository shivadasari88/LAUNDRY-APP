// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../components/ShopCard';
import FilterSection from '../components/FilterSection';

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
    { id: 1, name: 'Quick Clean', distance: '0.5 km', services: ['Washing', 'Ironing'], rating: 4.5 },
    { id: 2, name: 'Dry Clean Pro', distance: '1.2 km', services: ['Dry Cleaning'], rating: 4.2 },
    { id: 3, name: 'Premium Laundry', distance: '2.1 km', services: ['Washing', 'Dry Cleaning', 'Ironing'], rating: 4.8 },
    { id: 4, name: 'Express Wash', distance: '0.8 km', services: ['Washing'], rating: 4.0 },
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
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Find Laundry Shops Near You</h1>
        {userLocation && (
          <p className="text-gray-600">📍 Your location is loaded</p>
        )}
      </header>

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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedService || selectedCategory || selectedItem 
            ? `Filtered Shops (${filteredShops.length})` 
            : 'Nearby Shops'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(selectedService || selectedCategory || selectedItem ? filteredShops : nearbyShops).map(shop => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onClick={() => handleShopSelect(shop.id)}
            />
          ))}
        </div>

        {(selectedService || selectedCategory || selectedItem) && filteredShops.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No shops found for your selection. Try different filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;