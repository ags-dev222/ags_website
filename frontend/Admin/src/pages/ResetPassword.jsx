import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // Handle password reset
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://your-backend.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Password reset failed. Try again.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-4xl w-full flex items-center justify-between gap-10 p-6">
        {/* Left Section - Form */}
        <div className="w-1/2">
          <button onClick={() => navigate(-1)} className="text-gray-500 text-sm flex items-center mb-4">
            ◀ Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Password reset</h2>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleResetPassword}
              className={`w-full py-3 bg-green-700 text-white rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800 transition"
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-1/2">
          <img src="/assets/password-reset-illustration.png" alt="Password Reset" className="w-full" />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-sm bg-yellow-200 py-2">
        Copyright © 2023 | Powered by Association of Ghana Startups
      </footer>
    </div>
  );
};

export default ResetPassword;
