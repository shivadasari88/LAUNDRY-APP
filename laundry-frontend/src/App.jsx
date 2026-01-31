import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Provider Components
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import Services from "./components/provider/Services";
import Orders from "./components/provider/Orders";
import ProviderProfile from "./components/provider/ProviderProfile"; 


// Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard";

// Customer Components
import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";
import CustomerStatus from "./pages/customer/CustomerStatus"; // ✅ IMPORT THIS

import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Customer Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/shop/:shopId" element={<Shop />} />
          
          {/* ✅ FIXED: ADDED MISSING ROUTE FOR CUSTOMER STATUS */}
          <Route path="/customer/status" element={<CustomerStatus />} />

          {/* Provider Routes */}
          <Route path="/provider" element={<ProviderDashboard />}>
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<ProviderProfile />} />
            {/* Removed 'status' flow from provider as requested, they use 'orders' page now */}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}