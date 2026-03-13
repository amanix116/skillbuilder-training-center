import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Course APIs
export const courseAPI = {
  getAll: () => api.get('/courses'),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Application APIs
export const applicationAPI = {
  getAll: () => api.get('/applications'),
  create: (data) => api.post('/applications', data),
};

// Trainer APIs
export const trainerAPI = {
  getAll: () => api.get('/trainers'),
  create: (data) => api.post('/trainers', data),
  update: (id, data) => api.put(`/trainers/${id}`, data),
  delete: (id) => api.delete(`/trainers/${id}`),
};

// Contact APIs
export const contactAPI = {
  getAll: () => api.get('/contacts'),
  create: (data) => api.post('/contacts', data),
};

// Admin APIs
export const adminAPI = {
  login: (email, password) => api.post('/admin/login', { email, password }),
};

export default api;
