import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShopCard from '../../components/ShopCard';
import FilterSection from '../../components/FilterSection';
import { getAllShops } from '../../api/customerApi'; 

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const navigate = useNavigate();

  // Static options (Icons/Categories)
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
  }, [selectedService, shops]);

  const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Light Theme Navbar */}
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-4 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="text-2xl md:text-3xl font-bold text-cyan-600 flex items-center gap-2">
          <span>🫧</span> Uplift Wash
        </div>
        
        <nav className="flex items-center gap-4">
            {/* ✅ STATUS PAGE LINK FOR CUSTOMER */}
            <Link to="/customer/status" className="px-4 py-2 text-slate-600 font-medium hover:text-cyan-600 transition">
                📦 My Orders
            </Link>

            <button onClick={() => navigate("/cart")} className="relative p-2 text-slate-600 hover:text-cyan-600 transition">
                🛒 Cart
            </button>

            {/* ✅ LOGOUT BUTTON */}
            <button onClick={handleLogout} className="px-5 py-2 bg-slate-100 text-slate-700 rounded-full font-bold text-sm hover:bg-slate-200 transition">
                Logout
            </button>
        </nav>
      </header>

      <main className="flex-1 px-4 md:px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">Find Laundry Shops Near You</h1>
          <p className="text-slate-500">Professional washing, dry cleaning, and ironing services.</p>
        </div>

        <div className="mb-8">
          <FilterSection 
            services={servicesList} categories={categories} items={items} 
            selectedService={selectedService} onServiceSelect={setSelectedService} 
          />
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">{selectedService ? 'Filtered Shops' : '📍 Available Shops'}</h2>
          
          {loading ? <div className="text-center text-slate-500">Loading shops...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredShops.length > 0 ? (
                filteredShops.map(shop => (
                  <div key={shop.id} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer" onClick={() => navigate(`/shop/${shop.id}`)}>
                    {/* Ensure ShopCard component is also updated to use light theme colors inside it */}
                    <ShopCard shop={shop} onClick={() => navigate(`/shop/${shop.id}`)} />
                  </div>
                ))
              ) : <div className="col-span-full text-center text-slate-500 py-10">No shops found matching your criteria.</div>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;