import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import AdminLayout from "./layouts/AdminLayout";
import { lazy, Suspense } from "react";

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Events = lazy(() => import("./pages/Events"));
const Blog = lazy(() => import("./pages/Blog"));
const SiteContent = lazy(() => import("./pages/SiteContent"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OtpVerification = lazy(() => import("./pages/OTPVerification"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            }>
              <Login />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ForgotPassword />
            </Suspense>
          } />
          <Route path="/otp-verification" element={
            <Suspense fallback={<div>Loading...</div>}>
              <OtpVerification />
            </Suspense>
          } />
          <Route path="/reset-password" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPassword />
            </Suspense>
          } />

          {/* Protected Admin Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["superadmin", "admin", "editor"]} />}
          >
            <Route path="/" element={<AdminLayout />}>
              <Route index element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="dashboard" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="events" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Events />
                </Suspense>
              } />
              <Route path="blog" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Blog />
                </Suspense>
              } />
              <Route path="site-content" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SiteContent />
                </Suspense>
              } />
              <Route path="users" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserManagement />
                </Suspense>
              } />
              <Route path="settings" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Settings />
                </Suspense>
              } />
            </Route>
          </Route>

          {/* Redirect unknown routes to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
