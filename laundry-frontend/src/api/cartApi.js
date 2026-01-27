import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customer/cart";
const ORDER_URL = "http://localhost:8080/api/customer/order";

// 1. Initialize a Cart (Get Order ID)
export const initCart = async (customerId, shopId) => {
    return axios.post(`${BASE_URL}/init`, null, {
        params: { customerId, shopId }
    });
};

// 2. Add Item to Backend Cart
export const addItemToBackend = async (itemRequest) => {
    // Matches Backend DTO: AddOrderItemRequest
    return axios.post(`${BASE_URL}/item`, itemRequest);
};

// 3. Confirm Order (Checkout)
export const confirmOrder = async (orderId, customerId) => {
    return axios.post(`${ORDER_URL}/confirm`, null, {
        params: { orderId, customerId }
    });
};