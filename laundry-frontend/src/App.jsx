import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { CartProvider } from "./context/CartContext";

// Provider
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import DashboardOverview from "./components/provider/DashboardOverview";
import Services from "./components/provider/Services";
import Orders from "./components/provider/Orders";

// Customer
import CustomerLayout from "./components/customer/CustomerLayout";
import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";
import CustomerOrders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShopDetails from "./pages/admin/AdminShopDetails";
import ApprovedShops from "./pages/admin/ApprovedShops";
import RejectedShops from "./pages/admin/RejectedShops";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Customer */}
          <Route element={<CustomerLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/shop/:shopId" element={<Shop />} />
            <Route path="/orders" element={<CustomerOrders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Provider */}
          <Route path="/provider" element={<ProviderDashboard />}>
            <Route index element={<DashboardOverview />} />
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="shop/:shopId" element={<AdminShopDetails />} />
            <Route path="approvedShops" element={<ApprovedShops />} />
            <Route path="rejectedShops" element={<RejectedShops />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}


