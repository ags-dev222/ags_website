import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

// Configure axios defaults for better performance
axios.defaults.timeout = 8000; // 8 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.VITE_API_URL || 'https://your-domain.vercel.app'
    : import.meta.env.VITE_API_URL || 'http://localhost:5002';

  // 🔹 Load user and token from localStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("adminUser");
        const storedToken = localStorage.getItem("adminToken");
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          
          // Set default Authorization header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          // Verify token in background (non-blocking)
          verifyToken(storedToken).catch(() => {
            // Silent fail - user will be redirected to login if needed
            console.warn('Token verification failed silently');
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear potentially corrupted data
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Verify token validity with timeout and better error handling
  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${tokenToVerify}` },
        timeout: 5000 // 5 second timeout for token verification
      });
      
      if (response.data) {
        setUser(response.data);
        return true;
      }
    } catch (error) {
      // Only logout on auth errors, not network errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Token invalid, logging out:', error);
        logout();
      } else {
        console.warn('Token verification failed (network issue):', error.message);
      }
      return false;
    }
  };

  // 🔹 Login function (Handles authentication) - Optimized
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      }, {
        timeout: 10000 // 10 second timeout for login
      });

      console.log('🔍 Login Response:', response.data);
      
      if (response.data.token && response.data.user) {
        const { user: userData, token: authToken } = response.data;
        
        console.log('📝 User Data:', userData);
        console.log('🔑 Token:', authToken ? 'Present' : 'Missing');
        
        // Only allow admin roles to access CMS
        if (!['superadmin', 'admin', 'editor'].includes(userData.role)) {
          console.error('❌ Access denied for role:', userData.role);
          throw new Error('Access denied. Admin privileges required.');
        }

        console.log('✅ Setting user and token in state');
        setUser(userData);
        setToken(authToken);
        
        // Use try-catch for localStorage operations
        try {
          localStorage.setItem("adminUser", JSON.stringify(userData));
          localStorage.setItem("adminToken", authToken);
        } catch (storageError) {
          console.warn('LocalStorage error:', storageError);
        }
        
        // Set default Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common['Authorization'];
  };

  // 🔹 Enhanced Role-Based Access Control (RBAC) function
  const checkPermission = (allowedRoles) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };

  // Check specific permission
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions[permission] === true;
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${user.id}`, profileData);
      if (response.data.user) {
        const updatedUser = { ...user, ...response.data.user };
        setUser(updatedUser);
        localStorage.setItem("adminUser", JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        checkPermission, 
        hasPermission, 
        updateProfile, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; // ✅ Named Export (Ensures correct import)
