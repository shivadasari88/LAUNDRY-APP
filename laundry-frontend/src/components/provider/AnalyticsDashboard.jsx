// src/components/provider/AnalyticsDashboard.jsx
import { useState } from 'react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data
  const analyticsData = {
    revenue: {
      week: [1200, 1900, 1500, 2100, 1800, 2200, 2500],
      month: [4500, 5200, 4800, 5600, 6100, 5800, 6500, 7200, 6800, 7500, 8000, 8500],
      labels: {
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      }
    },
    orders: {
      week: [8, 12, 10, 15, 13, 18, 20],
      month: [45, 52, 48, 56],
      labels: {
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      }
    },
    customers: {
      week: [5, 8, 6, 10, 9, 12, 15],
      month: [25, 32, 28, 36],
      labels: {
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      }
    }
  };

  const metrics = [
    { id: 'revenue', label: 'Revenue', value: '₹24,500', change: '+12%', icon: '💰', color: 'from-green-500 to-emerald-600' },
    { id: 'orders', label: 'Total Orders', value: '124', change: '+8%', icon: '📦', color: 'from-blue-500 to-cyan-600' },
    { id: 'avgOrder', label: 'Avg. Order Value', value: '₹450', change: '+5%', icon: '📊', color: 'from-purple-500 to-pink-600' },
    { id: 'rating', label: 'Customer Rating', value: '4.5/5', change: '+0.2', icon: '⭐', color: 'from-yellow-500 to-orange-600' }
  ];

  const topServices = [
    { name: 'Washing', revenue: '₹8,500', orders: 45, growth: '+15%' },
    { name: 'Dry Cleaning', revenue: '₹7,200', orders: 32, growth: '+22%' },
    { name: 'Ironing', revenue: '₹4,800', orders: 28, growth: '+8%' },
    { name: 'Wash + Iron', revenue: '₹4,000', orders: 19, growth: '+12%' }
  ];

  const topItems = [
    { name: 'Shirt', quantity: 85, revenue: '₹3,400' },
    { name: 'Pant', quantity: 72, revenue: '₹3,600' },
    { name: 'Saree', quantity: 48, revenue: '₹5,760' },
    { name: 'Jeans', quantity: 42, revenue: '₹2,940' },
    { name: 'Bedsheet', quantity: 35, revenue: '₹2,800' }
  ];

  const getChartData = () => {
    const data = analyticsData[selectedMetric][timeRange];
    const labels = analyticsData[selectedMetric].labels[timeRange];
    return { data, labels };
  };

  const { data: chartData, labels: chartLabels } = getChartData();
  const maxValue = Math.max(...chartData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-white/70">Track your business performance and insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white"
          >
            <option value="revenue">Revenue</option>
            <option value="orders">Orders</option>
            <option value="customers">New Customers</option>
          </select>
          
          <div className="flex bg-white/10 rounded-xl p-1">
            {['day', 'week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className={`bg-gradient-to-br ${metric.color}/20 rounded-2xl p-6 border ${metric.color.replace('from-', 'border-').replace(' to-', '/30')}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{metric.icon}</div>
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-white/70">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts & Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white capitalize">
              {selectedMetric} Trends
            </h3>
            <div className="text-white/70">
              {timeRange === 'week' ? 'This Week' : 
               timeRange === 'month' ? 'This Month' : 
               timeRange === 'year' ? 'This Year' : 'Today'}
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end gap-2 mt-8">
            {chartData.map((value, index) => {
              const height = (value / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-white/50 mb-2">
                    {chartLabels[index]}
                  </div>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%` }}
                    title={`${value} ${selectedMetric === 'revenue' ? '₹' : ''}`}
                  ></div>
                  <div className="text-xs text-white/70 mt-2">
                    {selectedMetric === 'revenue' ? `₹${value}` : value}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-white/70 text-sm">
              <span className="text-green-400">↑ 12% growth</span> compared to last period
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Top Services</h3>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📊'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{service.name}</div>
                    <div className="text-sm text-white/60">{service.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{service.revenue}</div>
                  <div className="text-sm text-green-400">{service.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Items */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Most Requested Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-white/70 font-medium">Item</th>
                  <th className="text-left p-3 text-white/70 font-medium">Quantity</th>
                  <th className="text-left p-3 text-white/70 font-medium">Revenue</th>
                  <th className="text-left p-3 text-white/70 font-medium">Popular Service</th>
                </tr>
              </thead>
              <tbody>
                {topItems.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <span className="text-white">👕</span>
                        </div>
                        <span className="font-medium text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-white">{item.quantity} pieces</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-medium">{item.revenue}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {item.name === 'Saree' ? 'Dry Cleaning' : 'Washing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10">
              <div className="text-sm text-white/70 mb-1">Peak Hours</div>
              <div className="text-xl font-bold text-white">10 AM - 2 PM</div>
              <div className="text-sm text-white/60 mt-1">Most orders received</div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10">
              <div className="text-sm text-white/70 mb-1">Avg. Processing Time</div>
              <div className="text-xl font-bold text-white">4.2 hours</div>
              <div className="text-sm text-white/60 mt-1">From pickup to delivery</div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10">
              <div className="text-sm text-white/70 mb-1">Repeat Customers</div>
              <div className="text-xl font-bold text-white">42%</div>
              <div className="text-sm text-white/60 mt-1">Customer retention rate</div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10">
              <div className="text-sm text-white/70 mb-1">Best Rating Day</div>
              <div className="text-xl font-bold text-white">Friday</div>
              <div className="text-sm text-white/60 mt-1">Avg. 4.8/5 rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export & Actions */}
      <div className="flex justify-between items-center pt-6 border-t border-white/10">
        <div className="text-white/70 text-sm">
          Data updated in real-time • Last updated: Just now
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            📥 Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
            📊 Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;