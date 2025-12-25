import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import Home from './pages/customer/Home';
import Shop from './pages/customer/Shop';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
        <CartProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
       <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

       
        <Route path="/provider" element={<ProviderDashboard />} />
       {/* <Route path="/provider/dashboard" element={<ProviderDashboard />} /> */ } 

        <Route path="/admin" element={<AdminDashboard />} />
        

         <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop/:shopId" element={<Shop />} />
      </Routes>
    </BrowserRouter>
        </CartProvider>

  );
}
