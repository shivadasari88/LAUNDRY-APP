import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ItemList from '../../components/customer/ItemList';
import ItemModal from '../../components/customer/ItemModel';
import api from '../../services/api';

const Shop = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { syncGroupToBackend } = useCart();
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);


  useEffect(() => {
    setLoading(true);

    api.get(`/customer/shops/${shopId}`)
      .then(res => {
        setShop(res.data);
        return api.get(`/customer/shops/${shopId}/services`);
      })
      .then(res => {
        const servicesData = res.data;
        setServices(servicesData);

        // auto-select first service
        if (servicesData.length > 0) {
          setSelectedServiceId(servicesData[0].id);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [shopId]);

  useEffect(() => {
    if (!selectedServiceId) return;

    api.get(`/customer/services/${selectedServiceId}/items`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, [selectedServiceId]);


  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (groupData) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Please login to add items to cart");
      return;
    }
    const user = JSON.parse(userStr);

    // Ensure baseItem has shopId
    if (groupData.baseItem) {
      groupData.baseItem.shopId = parseInt(shopId);
    }

    console.log('Syncing to backend:', groupData);
    await syncGroupToBackend(groupData);
    setIsModalOpen(false);
  };

  const filteredItems = items.filter(item => {
    const itemName =
      item.name ||
      item.itemName ||
      '';

    const matchesSearch = itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filterCategory ||
      (typeof item.category === 'string'
        ? item.category === filterCategory
        : item.category?.name === filterCategory);

    return matchesSearch && matchesCategory;
  });


  const categories = [
    ...new Set(
      items
        .map(item =>
          item.category?.name || item.category || null
        )
        .filter(Boolean)
    )
  ];


  if (!shop) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading shop details...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Shops
      </button>

      {/* Shop Header */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{shop.name}</h1>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white font-bold">{shop.rating}</span>
                <span className="text-white/50 text-sm">({Math.floor(Math.random() * 100) + 50} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span>📍</span>
                <span>{shop.address}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[200px]">
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase font-bold tracking-wider">Opening Hours</p>
              <p className="text-white font-medium text-lg">{shop.openingHours}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase font-bold tracking-wider">Estimated Delivery</p>
              <p className="text-blue-300 font-medium">{shop.deliveryTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-white/70 leading-relaxed max-w-3xl">{shop.description}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            {shop.services?.map((service, index) => {
              const serviceName = typeof service === 'string' ? service : service.name;
              return (
                <span key={index} className="px-4 py-1.5 bg-blue-500/10 rounded-full text-blue-300 border border-blue-500/20 text-sm font-medium">
                  {serviceName}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Tabs */}
      <div className="mb-10 overflow-x-auto pb-4">
        <div className="flex gap-4">
          {services.map(service => (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`px-6 py-3 rounded-2xl border transition-all duration-300 min-w-[140px] text-center font-medium
                ${selectedServiceId === service.id
                  ? 'bg-blue-600/20 text-blue-200 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
            >
              <div className="text-2xl mb-1">{services.find(s => s.name === service.name)?.icon || '🧺'}</div>
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 sticky top-24">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🔍</span> Filter Items
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs uppercase font-bold mb-2 block">Search</label>
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase font-bold mb-2 block">Category</label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="" className="bg-[#0f172a]">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[#0f172a]">{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {filterCategory ? `${filterCategory} Items` : 'All Items'}
              <span className="text-white/50 text-lg ml-2 font-normal">({filteredItems.length})</span>
            </h2>
            {filterCategory && (
              <button
                onClick={() => setFilterCategory('')}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <ItemList
              items={filteredItems}
              onItemSelect={handleItemSelect}
            />
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <p className="text-white/60 mb-4">No items found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('');
                }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Shop;