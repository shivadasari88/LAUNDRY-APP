// src/components/provider/OrderManagement.jsx
import { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customerName: 'Rahul Sharma',
      items: 5,
      amount: 750,
      status: 'pending',
      pickupTime: 'Today, 10:00 AM',
      specialInstructions: 'Remove stains on collar',
      customerPhotos: 3
    },
    {
      id: 'ORD002',
      customerName: 'Priya Patel',
      items: 3,
      amount: 450,
      status: 'processing',
      pickupTime: 'Today, 11:30 AM',
      specialInstructions: 'Gentle wash for silk saree',
      customerPhotos: 2
    },
    {
      id: 'ORD003',
      customerName: 'Amit Kumar',
      items: 8,
      amount: 1200,
      status: 'ready',
      pickupTime: 'Today, 2:00 PM',
      specialInstructions: 'Dry clean woolen jacket',
      customerPhotos: 4
    },
    {
      id: 'ORD004',
      customerName: 'Sneha Gupta',
      items: 4,
      amount: 600,
      status: 'delivered',
      deliveryTime: 'Yesterday, 5:30 PM',
      rating: 4.5
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const statusConfig = {
    pending: { color: 'bg-yellow-500/20 text-yellow-300', label: 'Pending' },
    processing: { color: 'bg-blue-500/20 text-blue-300', label: 'Processing' },
    ready: { color: 'bg-green-500/20 text-green-300', label: 'Ready' },
    delivered: { color: 'bg-purple-500/20 text-purple-300', label: 'Delivered' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Management</h2>
          <p className="text-white/70">Manage customer orders and track status</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Status Filters */}
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'ready', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  filter === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {status === 'all' ? 'All' : statusConfig[status]?.label || status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className={`rounded-2xl p-4 border ${config.color.replace('bg-', 'bg-').replace('text-', 'border-')}`}>
              <div className="text-3xl font-bold text-white mb-1">{count}</div>
              <div className="capitalize">{config.label} Orders</div>
            </div>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Order ID</th>
                <th className="text-left p-4 text-white/70 font-medium">Customer</th>
                <th className="text-left p-4 text-white/70 font-medium">Items</th>
                <th className="text-left p-4 text-white/70 font-medium">Amount</th>
                <th className="text-left p-4 text-white/70 font-medium">Status</th>
                <th className="text-left p-4 text-white/70 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="font-medium text-white">#{order.id}</div>
                    <div className="text-sm text-white/60">{order.pickupTime || order.deliveryTime}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{order.customerName}</div>
                    {order.specialInstructions && (
                      <div className="text-sm text-white/60 truncate max-w-xs">
                        📝 {order.specialInstructions}
                      </div>
                    )}
                    {order.customerPhotos > 0 && (
                      <div className="text-sm text-blue-300 mt-1">
                        📸 {order.customerPhotos} photos uploaded
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-white">{order.items} items</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">₹{order.amount}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[order.status]?.color}`}>
                      {statusConfig[order.status]?.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm transition-colors"
                        onClick={() => {
                          // Open order details modal
                          alert(`View details for order ${order.id}`);
                        }}
                      >
                        View
                      </button>
                      {order.status === 'pending' && (
                        <button 
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 text-sm transition-colors"
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                        >
                          Accept
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button 
                          className="px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm transition-colors"
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button 
                          className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm transition-colors"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                        >
                          Deliver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal (placeholder) */}
      <div className="mt-6 text-center text-white/60">
        <p>Click "View" to see detailed order information including customer photos and specifications</p>
      </div>
    </div>
  );
};

export default OrderManagement;