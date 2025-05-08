import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ React Router Navigation Hook

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Mock user database (Replace this with API call)
    const users = [
      { name: "Solomon Agyei", email: "admin@example.com", role: "admin" },
      { name: "Mirabel", email: "editor@example.com", role: "editor" },
      { name: "Martha", email: "superadmin@example.com", role: "superadmin" },
    ];

    const user = users.find((u) => u.email === email);

    if (user && password === "password") {
      login(user); // ✅ Store user in context
      navigate("/dashboard", { replace: true }); // ✅ Redirect to dashboard
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* 🔹 Left Side (Image) */}
      <div className="hidden md:block w-[48%] relative">
        <img
          src="/landing.png"
          alt="AGS Team"
          className="h-full w-full object-cover translate-x-[-10px]" // Moves image slightly left
        />
      </div>

      {/* 🔹 Right Side (Login Form) */}
      <div className="w-full md:w-[52%] flex flex-col justify-center items-center bg-white px-8 relative">
        {/* Logo */}
        <img src="/ags-logo.png" alt="AGS Logo" className="w-20 mb-6" />

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Forgot Password - ✅ **Now using navigate() for proper routing** */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-green-600 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer - **Fixed at the Bottom** */}
        <p className="text-gray-500 text-sm absolute bottom-4">
          Copyright © {new Date().getFullYear()} | Powered by Association Of Ghana Startups
        </p>
      </div>
    </div>
  );
};

export default Login;
