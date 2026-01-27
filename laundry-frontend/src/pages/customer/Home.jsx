import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShopCard from '../../components/ShopCard';
import FilterSection from '../../components/FilterSection';
import { getAllShops } from '../../api/customerApi'; 

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const navigate = useNavigate();

  const servicesList = [{ id: 1, name: 'Washing', icon: '🧺' }, { id: 2, name: 'Dry Cleaning', icon: '🧼' }, { id: 3, name: 'Ironing', icon: '♨️' }];
  const categories = [{ id: 1, name: 'Men', icon: '👨' }, { id: 2, name: 'Women', icon: '👩' }, { id: 3, name: 'Kids', icon: '👶' }, { id: 4, name: 'Home', icon: '🏠' }];
  const items = [{ id: 1, name: 'Shirt' }, { id: 2, name: 'Pant' }, { id: 3, name: 'Saree' }];

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
      } catch (error) { console.error("Failed to fetch shops", error); } 
      finally { setLoading(false); }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    let filtered = [...shops];
    if (selectedService) filtered = filtered.filter(shop => shop.services.includes(selectedService));
    setFilteredShops(filtered);
  }, [selectedService, selectedCategory, selectedItem, shops]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900">
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-6 text-white">
        <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Uplift Wash</div>
        
        {/* ✅ CLEAN NAVBAR (Only Cart logic remains if implemented here) */}
      </header>

      <main className="flex-1 px-4 md:px-6 py-8">
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">Find Laundry Shops Near You</h1>
        </div>

        <div className="mb-8">
          <FilterSection services={servicesList} categories={categories} items={items} selectedService={selectedService} onServiceSelect={setSelectedService} />
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-white mb-6">{selectedService ? 'Filtered Shops' : '📍 Available Shops'}</h2>
          {loading ? <div className="text-white text-center">Loading...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredShops.length > 0 ? (
                filteredShops.map(shop => (
                  <div key={shop.id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer" onClick={() => navigate(`/shop/${shop.id}`)}>
                    <ShopCard shop={shop} onClick={() => navigate(`/shop/${shop.id}`)} />
                  </div>
                ))
              ) : <div className="text-white col-span-full text-center">No shops found.</div>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;