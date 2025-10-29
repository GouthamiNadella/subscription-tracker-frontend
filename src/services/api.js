import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const subscriptionAPI = {
  getUserSubscriptions: (userId) => api.get(`/subscriptions/user/${userId}`),
  getActiveSubscriptions: (userId) => api.get(`/subscriptions/user/${userId}/active`),
  createSubscription: (data) => api.post('/subscriptions', data),
  updateSubscription: (id, data) => api.put(`/subscriptions/${id}`, data),
  deleteSubscription: (id) => api.delete(`/subscriptions/${id}`),
};

export const analyticsAPI = {
  getDashboard: (userId) => api.get(`/analytics/dashboard/${userId}`),
  getSpendingTrends: (userId, months = 12) => 
    api.get(`/analytics/spending-trends/${userId}?months=${months}`),
  getCategoryBreakdown: (userId) => api.get(`/analytics/categories/${userId}`),
};

export default api;
