/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
// import Lottie from "lottie-react"; // For success animation
// import successAnimation from "../assets/success.json"; // Lottie file

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Get email from previous page

  // Handle OTP Input
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  // 🔹 Handle OTP Verification and Password Reset
  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join(""), newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center relative"
      >
        <h2 className="text-2xl font-bold text-gray-800">Verify OTP & Reset Password</h2>
        <p className="text-gray-500">Enter the OTP sent to your email.</p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        {/* 🔹 New Password Input */}
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 transition"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {error && <motion.p animate={{ x: [-5, 5, -5, 5, 0] }} className="text-red-500">{error}</motion.p>}

        <button
          onClick={handleVerifyOTP}
          className={`w-full mt-4 py-2 bg-green-600 text-white rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700 transition"
          }`}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify & Reset"}
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Didn’t receive the OTP? <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>

        {/* Success Animation */}
        {success && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
            <Lottie animationData={successAnimation} className="w-32 h-32" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OtpVerification;
