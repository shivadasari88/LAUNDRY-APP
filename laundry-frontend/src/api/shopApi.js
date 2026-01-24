import axios from "axios";

const BASE_URL = "http://localhost:8080/api/provider/shop";

export const createShop = (data) => {
    return axios.post(`${BASE_URL}/create`, data);
};

export const getMyShop = (providerId) => {
    return axios.get(`${BASE_URL}/${providerId}`);
};
