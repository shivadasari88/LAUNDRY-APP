import api from "../services/api";

export const getOrdersByShop = async (shopId) => {
    return api.get(`/provider/orders/shop/${shopId}`);
};

export const updateOrderStatus = async (orderId, status) => {
    return api.put(`/provider/orders/${orderId}/status`, { status });
};