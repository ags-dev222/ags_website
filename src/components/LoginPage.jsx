import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Navbar from './Navbar';
import Footer from './Footer';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Example login logic
    if (username === 'admin' && password === 'password') {
      // If login is successful, navigate to another page
      navigate('/');
    } else {
      // Set error message if login fails
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 pt-32"> {/* Increased pt-32 for more top padding */}
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded w-full">
              Login
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-green-600 hover:underline">Forgot Password?</a>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                <i className="fab fa-facebook-f mr-2"></i> Facebook
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center">
                <i className="fab fa-google mr-2"></i> Google
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;