import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Provider Components
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import Services from "./components/provider/Services";
import Orders from "./components/provider/Orders";
import ProviderProfile from "./components/provider/ProviderProfile"; 
import OrderFlow from "./components/provider/OrderFlow"; 

// Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShopDetails from "./pages/admin/AdminShopDetails";

// Customer Components
import Home from "./pages/customer/Home";
import Shop from "./pages/customer/Shop";

import { CartProvider } from "./context/CartContext";
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
          <Route path="/home" element={<Home />} />
          <Route path="/shop/:shopId" element={<Shop />} />

          {/* Provider */}
          <Route path="/provider" element={<ProviderDashboard />}>
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<ProviderProfile />} />
            
            {/* ✅ RENAMED ROUTE TO 'status' */}
            <Route path="status" element={<OrderFlow />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/shop/:shopId" element={<AdminShopDetails />} />
          <Route path="/admin/approvedShops" element={<ApprovedShops />} />
          <Route path="/admin/rejectedShops" element={<RejectedShops />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}