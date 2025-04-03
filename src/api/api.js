import axios from "axios";

const API_BASE_URL = "http://localhost:5173/"; //  backend API URL

// Utility function to handle errors
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null; // Ensures UI does not break
  }
};

//  Dashboard API
export const fetchDashboardStats = () => handleRequest(() => axios.get(`${API_BASE_URL}/dashboard-stats`));

//  Events Management API
export const fetchEvents = () => handleRequest(() => axios.get(`${API_BASE_URL}/events`));
export const fetchEventDetails = (eventId) => handleRequest(() => axios.get(`${API_BASE_URL}/events/${eventId}`));

//  Blog Management API
export const fetchBlogPosts = () => handleRequest(() => axios.get(`${API_BASE_URL}/blog-posts`));
export const fetchBlogDetails = (blogId) => handleRequest(() => axios.get(`${API_BASE_URL}/blog-posts/${blogId}`));

// ✅ Fix: Added `fetchRelatedPosts` for `RelatedPosts.jsx`
export const fetchRelatedPosts = () => handleRequest(() => axios.get(`${API_BASE_URL}/blog-related-posts`));

// 📌 User Management API
export const fetchUsers = () => handleRequest(() => axios.get(`${API_BASE_URL}/users`));
export const createUser = (userData) => handleRequest(() => axios.post(`${API_BASE_URL}/users`, userData));
export const updateUser = (userId, userData) => handleRequest(() => axios.put(`${API_BASE_URL}/users/${userId}`, userData));
export const deleteUser = (userId) => handleRequest(() => axios.delete(`${API_BASE_URL}/users/${userId}`));

// 📌 Settings API
export const fetchSettings = () => handleRequest(() => axios.get(`${API_BASE_URL}/settings`));
export const updateSettings = (settingsData) => handleRequest(() => axios.put(`${API_BASE_URL}/settings`, settingsData));
