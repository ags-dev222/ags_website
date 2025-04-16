import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import SiteContent from "./pages/SiteContent";
import UserManagement from "./pages/UserManagement"; // ✅ NEW - User Management Page
import Settings from "./pages/Settings"; // ✅ NEW - Settings Page
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification"; // ✅ NEW - OTP Verification Page
import ResetPassword from "./pages/ResetPassword"; // ✅ NEW - Reset Password Page
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          {/* 🔹 Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} /> {/* ✅ Added */}
          <Route path="/reset-password" element={<ResetPassword />} /> {/* ✅ Added */}

          {/* 🔹 Protected Admin Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["superadmin", "admin", "editor"]} />}
          >
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="events" element={<Events />} />
              {/* 🔹 Nested Routes */}
              <Route path="blog" element={<Blog />} />
              <Route path="site-content" element={<SiteContent />} />
              <Route path="users" element={<UserManagement />} /> ✅ Added
              <Route path="settings" element={<Settings />} /> {/* ✅ Added */}
            </Route>
          </Route>

          {/* 🔹 Redirect unknown routes to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
