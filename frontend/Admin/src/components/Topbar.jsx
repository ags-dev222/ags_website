import { useContext, useState, useEffect, useRef } from "react";
import { BellIcon, TrashIcon } from "@heroicons/react/24/outline"; // Removed unused icons
import { AnimatePresence, motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

// Function to Add a Notification
const addNotification = (user, notifications, setNotifications, action, type = "info", item = null) => {
  const newNotification = {
    message: `${user?.name || "Unknown User"} ${action} ${item ? `"${item}"` : ""}`,
    timestamp: new Date().toLocaleString(),
    user: user?.name || "Unknown User",
    type,
  };

  const updatedNotifications = [newNotification, ...notifications].slice(0, 20);
  setNotifications(updatedNotifications);
  localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
};

// Function to track user actions globally
const trackUserAction = (user, notifications, setNotifications, action, type = "info", item) => {
  addNotification(user, notifications, setNotifications, action, type, item);
};

const Topbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { user, logout, hasPermission } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [filter, setFilter] = useState("all");
  const notificationDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation(); // Added to get current route

  // Mapping of route paths to page titles
  const pathToTitle = {
    '/dashboard': 'Dashboard',
    '/blog': 'Blogs',
    '/site-content': 'Site Content',
    '/events': 'Events',
    '/users': 'User Management',
    '/users/:userId': 'User Details',
    '/events/:eventId': 'Event Details',
    '/blog/:blogId': 'Blog Details',
    '/settings': 'Settings', 
  };

  // Determine the current page title, default to "Dashboard" if path not found
  const pageTitle = pathToTitle[location.pathname] || 'Dashboard';

  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  // Track user login
  useEffect(() => {
    if (user) {
      trackUserAction(user, notifications, setNotifications, "logged in", "info");
    }
  }, [user]);

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showNotificationDropdown || showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotificationDropdown, showProfileDropdown]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Filtered Notifications
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  // Grouping Similar Notifications
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    const existing = acc.find((n) => n.message === notif.message);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ ...notif, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className={`relative flex justify-between items-center px-6 py-4 shadow-md transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold ml-5">{pageTitle}</h1>

      {/* Right Section: Notifications, Dark Mode Toggle & User Profile */}
      <div className="flex items-center space-x-6 relative">
        {/* Notifications Icon */}
        <button className="relative" onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}>
          <BellIcon className={`w-6 h-6 transition ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown with Smooth Animation */}
        <AnimatePresence>
          {showNotificationDropdown && (
            <motion.div
              ref={notificationDropdownRef}
              className={`absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-4 z-50`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header & Actions */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <button onClick={clearNotifications} title="Clear All">
                  <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-600" />
                </button>
              </div>

              {/* Filter Dropdown */}
              <div className="relative mb-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="all">All</option>
                  <option value="info">General</option>
                  <option value="warning">Warnings</option>
                  <option value="error">Errors</option>
                </select>
              </div>

              {/* Notifications List */}
              {groupedNotifications.length > 0 ? (
                <div className="max-h-64 overflow-auto">
                  {groupedNotifications.map((notif, index) => (
                    <div
                      key={index}
                      className={`border-b py-2 px-2 flex justify-between items-center rounded-md 
                        ${notif.type === "error" ? "bg-red-100 dark:bg-red-700" : notif.type === "warning" ? "bg-yellow-100 dark:bg-yellow-700" : "bg-gray-100 dark:bg-gray-700"}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {notif.user} - {notif.timestamp}
                        </p>
                      </div>
                      {notif.count > 1 && (
                        <span className="text-xs font-bold bg-gray-500 text-white px-2 py-0.5 rounded-full">
                          {notif.count}x
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No new notifications.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-green-500 transition ${darkMode ? "bg-green-600 text-white" : "bg-green-700 text-white"}`}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="text-left">
              <p className="font-semibold text-sm">{user?.name || "User"}</p>
              <p className={`text-xs transition ${darkMode ? "text-gray-400" : "text-gray-500"} capitalize`}>
                {user?.role || "user"}
              </p>
            </div>
            <svg className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                ref={profileDropdownRef}
                className={`absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50`}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Profile Header */}
                <div className="p-4 border-b dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {user?.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition ${darkMode ? "bg-green-600 text-white" : "bg-green-700 text-white"}`}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                        user?.role === 'superadmin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        user?.role === 'admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        user?.role === 'editor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      } capitalize`}>
                        {user?.role || 'user'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      // Navigate to profile page
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My Profile</span>
                  </button>

                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      // Navigate to settings
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </button>

                  <div className="border-t dark:border-gray-700 mt-2 pt-2">
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 flex items-center space-x-3"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        logout();
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Export utility functions
export { trackUserAction, addNotification };

export default Topbar;