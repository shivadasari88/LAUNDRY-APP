import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customer";

// Get all approved shops for the Landing Page
export const getAllShops = async () => {
    return axios.get(`${BASE_URL}/shops`);
};

// Get details of a specific shop
export const getShopById = async (shopId) => {
    return axios.get(`${BASE_URL}/shops/${shopId}`);
};

// Get services and items for a specific shop
export const getShopServices = async (shopId) => {
    return axios.get(`${BASE_URL}/shops/${shopId}/services`);
};


// ✅ ADD THIS: Fetch orders for a specific customer
export const getCustomerOrders = async (customerId) => {
    return axios.get(`${BASE_URL}/orders/${customerId}`);
};