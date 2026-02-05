// src/pages/customer/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../../components/ShopCard';
import FilterSection from '../../components/FilterSection';
import { getAllShops } from '../../api/customerApi';
import NotificationBell from '../../components/NotificationBell';

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const navigate = useNavigate();

  // Get user ID - adjust based on your auth system
  const userId = localStorage.getItem('userId') || 1;
  const userRole = 'CUSTOMER';

  const servicesList = [
    { id: 1, name: 'Washing', icon: '🧺' },
    { id: 2, name: 'Dry Cleaning', icon: '🧼' },
    { id: 3, name: 'Ironing', icon: '♨️' }
  ];

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await getAllShops();
        const mappedShops = res.data.map(shop => ({
          ...shop,
          services: shop.serviceTypes?.map(s => s.serviceName) || [],
          rating: shop.rating || 4.5,
          distance: '1.5 km'
        }));
        setShops(mappedShops);
        setFilteredShops(mappedShops);
      } catch (error) {
        console.error("Failed to fetch shops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    let filtered = [...shops];
    if (selectedService) {
      filtered = filtered.filter(shop => shop.services.includes(selectedService));
    }
    setFilteredShops(filtered);
  }, [selectedService, shops]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
      <header className="flex items-center justify-between px-6 py-4 text-white">
        <div className="text-2xl font-bold">
          Uplift Wash
        </div>
        
        <div className="flex items-center gap-4">
          {/* ✅ NOTIFICATION BELL */}
          <NotificationBell userId={userId} userRole={userRole} />
          
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Profile
          </button>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Find Laundry Shops</h1>
        </div>

        <div className="mb-8">
          <FilterSection 
            services={servicesList} 
            selectedService={selectedService} 
            onServiceSelect={setSelectedService} 
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {selectedService ? 'Filtered Shops' : 'Available Shops'}
          </h2>
          
          {loading ? (
            <div className="text-white text-center">Loading shops...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShops.map(shop => (
                <div 
                  key={shop.id} 
                  onClick={() => navigate(`/shop/${shop.id}`)}
                  className="cursor-pointer"
                >
                  <ShopCard shop={shop} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;