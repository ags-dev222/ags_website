import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-16 py-4 bg-gray-900 text-white">
      {/* Left Side */}
      <div className="flex space-x-6 items-center">
        {/* Logo */}
        <div>
          <a href="#">
            <img src="/src/assets/images/ags-logo.png" alt="Logo" className="h-12" /> {/* Replace with your logo */}
          </a>
        </div>
        {/* Explore Dropdown */}
        <div className="relative">
          <button onClick={() => setIsExploreOpen(!isExploreOpen)} className="hover:underline">
            Explore
          </button>
          {isExploreOpen && (
            <div className="absolute mt-2 w-40 bg-gray-800 shadow-lg">
              <Link to="/events" className="block px-4 py-2 hover:bg-gray-700">
                Events
              </Link>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Ecosystem
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Search Icon */}
      <button className="p-2 text-gray-300 hover:text-yellow-300">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>

      {/* Right Side */}
      <div>
        <Link to="/login">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-1 rounded">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
