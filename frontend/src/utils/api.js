import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.VITE_API_URL || 'https://your-domain.vercel.app'
  : 'http://localhost:5173';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Content API for frontend consumption
export const getHeroSection = async () => {
  try {
    const response = await api.get('/content/hero');
    return response.data;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
};

export const getSiteSettings = async () => {
  try {
    const response = await api.get('/content/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const getPageContent = async (slug) => {
  try {
    const response = await api.get(`/content/page/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return null;
  }
};

// Export API instance for other uses
export default api;
