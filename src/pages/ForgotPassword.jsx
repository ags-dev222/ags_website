import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // ✅ Modern Back Button Icon

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://your-backend.com/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Redirect to OTP Verification Page with email state
        navigate("/otp-verification", { state: { email } });
      } else {
        setError(data.message || "Failed to send OTP. Try again.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white px-6 relative">
      {/* 🔹 Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-35">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 mb-6 flex items-center text-sm hover:text-gray-800 transition"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Forgotten Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email, and we will send you an OTP code to confirm.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Send OTP Button */}
          <button
            type="submit"
            className={`w-full bg-green-600 text-white p-3 rounded-lg font-semibold transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>

      {/* 🔹 Right Side - Image Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src="/fgtn.png" // Ensure this path is correct
          alt="Forgot Password"
          className="max-h-[400px] w-auto object-contain"
        />
      </div>

      {/* Footer (Fixed at Base) */}
      <p className="absolute bottom-4 w-full text-center text-gray-700 text-sm">
        Copyright © {new Date().getFullYear()} | Powered by Association Of Ghana Startups
      </p>
    </div>
  );
};

export default ForgotPassword;
