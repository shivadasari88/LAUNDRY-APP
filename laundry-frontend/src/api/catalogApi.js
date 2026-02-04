import api from "../services/api";

// ✅ Add Service
export const addServiceType = async (serviceRequest) => {
    // serviceRequest should be: { serviceName: "Dry Cleaning", shopId: 1 }
    console.log("Sending to Backend:", serviceRequest);
    return api.post(`/provider/catalog/services`, serviceRequest);
};

// ✅ Add Item
export const addItem = async (itemRequest) => {
    return api.post(`/provider/catalog/items`, itemRequest);
};

// ✅ Get Services
export const getServicesByShop = async (shopId) => {
    return api.get(`/provider/catalog/shop/${shopId}`);
};

// ✅ Get My Services (Secure)
export const getMyServices = async () => {
    return api.get(`/provider/catalog/my-services`);
};

// ✅ Get Items by Service
export const getItemsByService = async (serviceTypeId) => {
    return api.get(`/provider/catalog/services/${serviceTypeId}/items`);
};