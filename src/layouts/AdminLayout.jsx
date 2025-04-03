import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const AdminLayout = () => {
  const { darkMode } = useContext(ThemeContext); // ✅ Access dark mode state

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6 overflow-auto h-full">
          <Outlet /> {/* ✅ Ensures correct rendering of protected pages */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
