import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 bg-gray-900 text-white md:px-16">
      {/* Left Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/src/assets/images/AGS LOGO 2 1.png" // Replace with your actual logo path
              alt="Logo"
              className="h-10 w-30 md:h-9 md:w-58" // Adjust size as needed
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
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
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex">
        <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded md:px-8">
          Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link to="/" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <button
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>Explore</span>
            <span>&#9662;</span>
          </button>
          {isExploreOpen && (
            <div className="w-full bg-gray-800 shadow-lg">
              <Link to="/events" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Events
              </Link>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Ecosystem
              </a>
            </div>
          )}
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>About</span>
            <span>&#9662;</span>
          </button>
          {isAboutOpen && (
            <div className="w-full bg-gray-800 shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Who we are
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Our Mission
              </a>
            </div>
          )}
          <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
