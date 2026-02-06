import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../../components/customer/ShopCard';
import api from '../../services/api';

const Home = () => {
  const [nearbyShops, setNearbyShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/customer/shops')
      .then(res => {
        setNearbyShops(res.data);
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

      {/* Stats Bar Removed as per request (was static) */}

      {/* Shops Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-8 gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Recommended Shops
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Showing {nearbyShops.length} {nearbyShops.length === 1 ? 'shop' : 'shops'}
            </p>
          </div>
        </div>

        {nearbyShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nearbyShops.map(shop => (
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
            <p className="text-white/50 mb-6 max-w-md mx-auto">We couldn't find any shops nearby.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;