import api from "../services/api";

// ✅ Get ALL shops
export const getAllShops = () => {
    return api.get("/admin/shops");
};

// ✅ Get only pending shops (already used)
export const getPendingShops = () => {
    return api.get("/admin/shops/pending");
};

// ✅ Approve shop
export const approveShop = (shopId) => {
    return api.put(`/admin/shops/${shopId}/approve`);
};

// ✅ Reject shop
export const rejectShop = (shopId) => {
    return api.put(`/admin/shops/${shopId}/reject`);
};
