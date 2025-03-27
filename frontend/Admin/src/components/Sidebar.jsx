import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext"; 

import {
  Squares2X2Icon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  MoonIcon,
  ArrowLeftOnRectangleIcon,
  WrenchIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { checkPermission, logout } = useContext(AuthContext); 
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Squares2X2Icon className="w-6 h-6" />, roles: ["admin", "editor", "viewer"] },
    { name: "Events", path: "/events", icon: <CalendarIcon className="w-6 h-6" />, roles: ["admin", "editor"] },
    { name: "Blog", path: "/blog", icon: <NewspaperIcon className="w-6 h-6" />, roles: ["admin", "editor"] },
    { name: "Site Content", path: "/site-content", icon: <WrenchIcon className="w-6 h-6" />, roles: ["admin", "editor"] },
  ];

  return (
    <div className={`h-screen w-60 flex flex-col justify-between transition-all duration-300 shadow-md 
      ${darkMode ? "bg-gray-900 text-gray-300" : "bg-[#F5F5F5] text-gray-700"}`}>

      {/* 🔹 Logo */}
      <div className="p-5 flex items-center space-x-3">
        <img src="/ags-logo.png" alt="AGS Admin Logo" className="h-10 w-auto" />
      </div>

      {/* 🔹 Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          checkPermission?.(item.roles) && (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-4 p-3 rounded-lg mx-3 my-1 font-semibold text-[15px] transition 
                ${location.pathname === item.path 
                  ? "bg-green-600 text-white" 
                  : darkMode 
                    ? "hover:bg-gray-800 text-gray-300" 
                    : "hover:bg-gray-300 text-gray-700"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          )
        ))}

        {/* 🔹 User Management (Previously "Users") */}
        {checkPermission?.(["admin"]) && (
          <Link
            to="/users"
            className={`flex items-center space-x-4 p-3 rounded-lg mx-3 my-1 font-semibold text-[15px] transition 
              ${location.pathname === "/users"
                ? "bg-green-600 text-white"
                : darkMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-300 text-gray-700"}`}
          >
            <UsersIcon className="w-6 h-6" />
            <span>User Management</span> {/* ✅ Renamed */}
          </Link>
        )}

        {/* 🔹 Account Settings (Previously "Settings") */}
        {checkPermission?.(["admin", "editor"]) && (
          <Link
            to="/settings"
            className={`flex items-center space-x-4 p-3 rounded-lg mx-3 my-1 font-semibold text-[15px] transition 
              ${location.pathname === "/settings"
                ? "bg-green-600 text-white"
                : darkMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-300 text-gray-700"}`}
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <span>Account Settings</span> {/* ✅ Renamed */}
          </Link>
        )}
      </nav>

      {/* 🔹 Dark Mode Toggle */}
      <div className={`flex items-center justify-between px-4 py-3 mx-3 my-2 rounded-lg transition 
        ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
        <div className="flex items-center space-x-3">
          <MoonIcon className="w-6 h-6" />
          <span className="text-[15px] font-semibold">Dark Mode</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition 
            ${darkMode ? "bg-green-600" : "bg-gray-400"}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition 
            ${darkMode ? "translate-x-5" : "translate-x-0"}`}>
          </div>
        </button>
      </div>

      {/* 🔹 Logout Button */}
      <button
        onClick={handleLogout} 
        className={`flex items-center space-x-3 p-3 mx-3 my-3 rounded-lg transition text-[15px] font-semibold 
          ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-300"}`}
      >
        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
