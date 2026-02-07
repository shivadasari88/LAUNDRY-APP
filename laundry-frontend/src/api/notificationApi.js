import api from "../services/api";

// Fetch notifications for a user based on their ID and role
export const getUserNotifications = async (userId, role) => {
  return await api.get("/notifications", {
    params: { userId, role }
  });
};

// Mark a specific notification as read
export const markNotificationRead = async (id) => {
  return await api.put(`/notifications/${id}/read`);
};
