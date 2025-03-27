import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Prevents flashing login screen while checking authentication status
  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  // ✅ If user is not logged in or lacks permission, redirect to login
  if (!user || !allowedRoles?.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ Ensures protected pages render inside AdminLayout
};

export default ProtectedRoute;
