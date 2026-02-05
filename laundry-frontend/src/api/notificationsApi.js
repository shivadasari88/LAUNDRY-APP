// src/api/notificationsApi.js
const API_URL = 'http://localhost:8080/api';

export const notificationsApi = {
  getUserNotifications: async (userId, role) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications?userId=${userId}&role=${role}`
      );
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  sendOrderStatusNotification: async (orderId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/order/${orderId}/status/${status}`,
        { method: 'POST' }
      );
      return response.ok;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/read`,
        { method: 'PUT' }
      );
      return response.ok;
    } catch (error) {
      console.error('Error marking as read:', error);
      return false;
    }
  }
};