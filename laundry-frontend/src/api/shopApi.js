import api from "../services/api";

export const createShop = (data) => {
  return api.post(`/provider/shop/create`, data);
};

export const getMyShop = () => {
  return api.get(`/provider/shop/my-shop`);
};
