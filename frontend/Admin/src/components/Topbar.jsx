import { useContext, useState, useEffect, useRef } from "react";
import { BellIcon, TrashIcon, FunnelIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";// ✅ Import framer-motion
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

// ✅ Function to Add a Notification
const addNotification = (user, notifications, setNotifications, action, type = "info", item = null) => {
  const newNotification = {
    message: `${user?.name || "Unknown User"} ${action} ${item ? `"${item}"` : ""}`,
    timestamp: new Date().toLocaleString(),
    user: user?.name || "Unknown User",
    type, // ✅ Added Type (info, warning, error)
  };

  const updatedNotifications = [newNotification, ...notifications].slice(0, 20);
  setNotifications(updatedNotifications);
  localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
};

// ✅ Function to track user actions globally
const trackUserAction = (user, notifications, setNotifications, action, type = "info", item) => {
  addNotification(user, notifications, setNotifications, action, type, item);
};

const Topbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  useEffect(() => {
    if (user) {
      trackUserAction(user, notifications, setNotifications, "logged in", "info");
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // ✅ Filtered Notifications
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  // ✅ Grouping Similar Notifications
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
      <h1 className="text-2xl font-semibold ml-5">Dashboard</h1>

      {/* Right Section: Notifications & User Profile */}
      <div className="flex items-center space-x-6 relative">
        {/* 🔔 Notifications Icon */}
        <button className="relative" onClick={() => setShowDropdown(!showDropdown)}>
          <BellIcon className={`w-6 h-6 transition ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* 🔔 Notifications Dropdown with Smooth Animation */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div 
              ref={dropdownRef} 
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

              {/* 🔹 Filter Dropdown */}
              <div className="relative mb-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
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
                    <div key={index} className={`border-b py-2 px-2 flex justify-between items-center rounded-md 
                        ${notif.type === "error" ? "bg-red-100 dark:bg-red-700" :
                          notif.type === "warning" ? "bg-yellow-100 dark:bg-yellow-700" : "bg-gray-100 dark:bg-gray-700"}`}
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

        {/* 🔹 User Profile */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${darkMode ? "bg-green-600 text-white" : "bg-green-700 text-white"}`}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className={`text-sm transition ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Export trackUserAction for use in other components
export { trackUserAction, addNotification };

export default Topbar;
