import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoggingIn(false);
      return;
    }

    try {
      console.log('🚀 Attempting login with:', { email, password: password ? '****' : 'empty' });
      const result = await login(email, password);
      console.log('🔍 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful, navigating to dashboard');
        navigate("/dashboard", { replace: true });
      } else {
        console.error('❌ Login failed:', result.error);
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError(null);
    setIsLoggingIn(true);

    try {
      // For now, show that social login is coming soon
      setError(`${provider} login is coming soon. Please use email/password for now.`);
      // TODO: Implement actual social login integration
      // const result = await socialLogin(provider);
    } catch (error) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoggingIn(false);
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
            disabled={isLoggingIn || loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
          >
            {isLoggingIn ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full max-w-sm my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons - Arranged Horizontally */}
        <div className="w-full max-w-sm">
          {/* Social Login Row */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoggingIn || loading}
              className="flex items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-300"
              title="Continue with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <button
              onClick={() => handleSocialLogin('LinkedIn')}
              disabled={isLoggingIn || loading}
              className="flex items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-300"
              title="Continue with LinkedIn"
            >
              <svg className="w-5 h-5 fill-[#0077B5]" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            <button
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoggingIn || loading}
              className="flex items-center justify-center px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-300"
              title="Continue with Apple"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          </div>
          
          {/* Social Login Label */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Social login coming soon
          </p>
        </div>

        {/* Footer - **Fixed at the Bottom** */}
        <p className="text-gray-500 text-sm absolute bottom-4">
          Copyright © {new Date().getFullYear()} | Powered by Association Of Ghana Startups
        </p>
      </div>
    </div>
  );
};

export default Login;
