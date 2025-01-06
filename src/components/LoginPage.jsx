import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-32"> {/* Increased pt-32 for more top padding */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Login</h1>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;