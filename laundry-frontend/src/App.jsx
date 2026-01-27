import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderLayout from "./components/provider/ProviderLayout";
import Services from "./components/provider/Services";
import Orders from "./components/provider/Orders";

import AdminDashboard from "./pages/admin/AdminDashboard";

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
            {/* These render INSIDE ProviderLayout */}
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approvedShops" element={<ApprovedShops/>} />
          <Route path="/admin/rejectedShops" element={<RejectedShops/>} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
