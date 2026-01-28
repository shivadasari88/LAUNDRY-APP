import axios from "axios";

// This matches your ProviderOrderController @RequestMapping
const BASE_URL = "http://localhost:8080/api/provider/orders"; 

// ✅ FIX: Added '/shop' to the path to match @GetMapping("/shop/{shopId}")
export const getOrdersByShop = async (shopId) => {
    return axios.get(`${BASE_URL}/shop/${shopId}`);
};

// Update status
export const updateOrderStatus = async (orderId, status) => {
    return axios.put(`${BASE_URL}/${orderId}/status`, { status }); // Updated to send JSON body usually preferred
};