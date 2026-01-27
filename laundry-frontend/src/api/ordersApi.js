import axios from "axios";

const BASE_URL = "http://localhost:8080/api/provider/orders";

export const getOrdersByShop = async (shopId) => {
    return axios.get(`${BASE_URL}/shop/${shopId}`);
};

export const updateOrderStatus = async (orderId, status) => {
    return axios.put(`${BASE_URL}/${orderId}/status`, { status });
};