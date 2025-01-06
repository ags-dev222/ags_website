import { useState } from "react";
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 bg-gray-900 text-white md:px-16">
      {/* Left Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/src/assets/images/ags-logo.png" // Replace with your actual logo path
              alt="Logo"
              className="h-12 w-12 md:h-16 md:w-16" // Increased size
            />
          </Link>
        </div>

        {/* Home Tab */}
        <div>
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </div>

        {/* Explore Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>Explore</span>
            <span>&#9662;</span>
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

        {/* About Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>About</span>
            <span>&#9662;</span>
          </button>
          {isAboutOpen && (
            <div className="absolute mt-2 w-40 bg-gray-800 shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Who we are
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Our Mission
              </a>
            </div>
          )}
        </div>

        {/* Search Icon */}
        <button className="p-2 text-gray-300 hover:text-yellow-300">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Right Side */}
      <div>
        <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded md:px-8">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
