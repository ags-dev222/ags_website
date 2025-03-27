import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Prevents flashing login screen

  // 🔹 Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Only set loading false after checking storage
  }, []);

  // 🔹 Login function (Handles authentication)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔹 Role-Based Access Control (RBAC) function
  const checkPermission = (allowedRoles) => {
    return user && allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkPermission, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; // ✅ Named Export (Ensures correct import)
