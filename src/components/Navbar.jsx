import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (event) => {
    if (
      !Object.values(dropdownRefs.current).some((ref) =>
        ref.contains(event.target)
      )
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div
            className="relative group"
            ref={(el) => (dropdownRefs.current.explore = el)}
          >
            <button
              onClick={() => handleDropdownToggle('explore')}
              className="flex items-center space-x-1 hover:text-yellow-300"
            >
              <span>Explore</span>
              <span>&#9662;</span>
            </button>
            {activeDropdown === 'explore' && (
              <div className="absolute mt-2 w-40 bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform origin-top animate-dropdown">
                <Link to="/activities" className="block px-4 py-2 hover:bg-gray-700">
                  Activities
                </Link>
                <Link to="/events" className="block px-4 py-2 hover:bg-gray-700">
                  Events
                </Link>
                <Link to="/ecosystem" className="block px-4 py-2 hover:bg-gray-700">
                  Ecosystem
                </Link>
                <Link to="/blog1" className="block px-4 py-2 hover:bg-gray-700">
                  Blog
                </Link>
                <Link to="/resources" className="block px-4 py-2 hover:bg-gray-700">
                  Resources
                </Link>
              </div>
            )}
          </div>
          <div
            className="relative group"
            ref={(el) => (dropdownRefs.current.about = el)}
          >
            <button
              onClick={() => handleDropdownToggle('about')}
              className="flex items-center space-x-1 hover:text-yellow-300"
            >
              <span>About</span>
              <span>&#9662;</span>
            </button>
            {activeDropdown === 'about' && (
              <div className="absolute mt-2 w-40 bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform origin-top animate-dropdown">
                <Link to="/about-team" className="block px-4 py-2 hover:bg-gray-700">
                  Who we are
                </Link>
                <Link to="/about-mission-vission" className="block px-4 py-2 hover:bg-gray-700">
                  Our Mission
                </Link>
                <Link to="/success-stories" className="block px-4 py-2 hover:bg-gray-700">
                  Success Stories
                </Link>
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
            onClick={() => handleDropdownToggle('explore')}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>Explore</span>
            <span>&#9662;</span>
          </button>
          {activeDropdown === 'explore' && (
            <div className="w-full bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform origin-top animate-dropdown">
              <Link to="/activities" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Activities
              </Link>
              <Link to="/events" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Events
              </Link>
              <Link to="/ecosystem" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Ecosystem
              </Link>
              <Link to="/resources" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Resources
              </Link>
            </div>
          )}
          <button
            onClick={() => handleDropdownToggle('about')}
            className="flex items-center space-x-1 hover:text-yellow-300"
          >
            <span>About</span>
            <span>&#9662;</span>
          </button>
          {activeDropdown === 'about' && (
            <div className="w-full bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform origin-top animate-dropdown">
              <Link to="/about-team" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Who we are
              </Link>
              <Link to="/about-mission-vission" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Our Mission
              </Link>
              <Link to="/success-stories" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                Success Stories
              </Link>
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