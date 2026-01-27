import axios from "axios";

const BASE_URL = "http://localhost:8080/api/provider/catalog";

// ✅ Add Service
export const addServiceType = async (serviceRequest) => {
    // serviceRequest should be: { serviceName: "Dry Cleaning", shopId: 1 }
    console.log("Sending to Backend:", serviceRequest); 
    return axios.post(`${BASE_URL}/services`, serviceRequest);
};

// ✅ Add Item
export const addItem = async (itemRequest) => {
    return axios.post(`${BASE_URL}/items`, itemRequest);
};

// ✅ Get Services
export const getServicesByShop = async (shopId) => {
    return axios.get(`${BASE_URL}/shop/${shopId}/services`);
};