// Shared Content API for both Frontend and Admin
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-domain.vercel.app' 
  : 'http://localhost:5173';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Content Management APIs
export const contentAPI = {
  // Hero Section
  getHeroSection: () => api.get('/content/hero'),
  updateHeroSection: (data) => api.put('/content/hero', data),
  
  // Blog Posts
  getBlogPosts: () => api.get('/content/blog'),
  createBlogPost: (data) => api.post('/content/blog', data),
  updateBlogPost: (id, data) => api.put(`/content/blog/${id}`, data),
  deleteBlogPost: (id) => api.delete(`/content/blog/${id}`),
  
  // Events
  getEvents: () => api.get('/content/events'),
  createEvent: (data) => api.post('/content/events', data),
  updateEvent: (id, data) => api.put(`/content/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/content/events/${id}`),
  
  // Team Members
  getTeam: () => api.get('/content/team'),
  updateTeam: (data) => api.put('/content/team', data),
  
  // Site Settings
  getSettings: () => api.get('/content/settings'),
  updateSettings: (data) => api.put('/content/settings', data)
};

export default contentAPI;
