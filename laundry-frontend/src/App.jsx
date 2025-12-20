import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Home from './pages/Home';
import Shop from './pages/Shop';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
        <CartProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
       <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

       
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        

         <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop/:shopId" element={<Shop />} />
      </Routes>
    </BrowserRouter>
        </CartProvider>

  );
}
