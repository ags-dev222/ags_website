import { useState, useEffect } from "react";
import { UserContext } from "./UserContext"; // ✅ Import from separate file

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock login function (replace with API)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
