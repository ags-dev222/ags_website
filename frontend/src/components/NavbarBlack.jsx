import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const NavbarBlack = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-black flex items-center justify-between px-4 py-4 text-white md:px-16">
      {/* Left Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="./images/AGS LOGO 2 1.png"
              alt="Logo"
              className="h-10 w-10 md:h-9 md:w-30"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Explore Items as Tabs */}
          <Link
            to="/events"
            className="px-4 py-2 text-white hover:text-yellow-300 hover:bg-gray-800 rounded transition"
          >
            Events
          </Link>
          <Link
            to="/ecosystem"
            className="px-4 py-2 text-white hover:text-yellow-300 hover:bg-gray-800 rounded transition"
          >
            Ecosystem
          </Link>
          <Link
            to="/blog1"
            className="px-4 py-2 text-white hover:text-yellow-300 hover:bg-gray-800 rounded transition"
          >
            Blog
          </Link>
          <Link
            to="/resources"
            className="px-4 py-2 text-white hover:text-yellow-300 hover:bg-gray-800 rounded transition"
          >
            Resources
          </Link>

          {/* About Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-yellow-300">
              <span>About</span>
              <span>&#9662;</span>
            </button>
            <div className="absolute mt-2 w-40 bg-black shadow-lg hidden group-hover:block">
              <Link
                to="/about-team"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Our Team
              </Link>
              <Link
                to="/about-mission-vission"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Our Mission
              </Link>
              <Link
                to="/success-stories"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Success Stories
              </Link>
            </div>
          </div>
        </div>

        {/* Search Icon */}
        <div className="relative">
          <input
            type="text"
            className={`h-10 border-none p-2 text-white rounded-full bg-transparent transition-all duration-500 ease-in-out 
              ${isSearchOpen ? "w-64 bg-transparent border-b border-white" : "w-10"}`}
            placeholder={isSearchOpen ? "Type to Search..." : ""}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
          />
          <button
            className="absolute right-0 top-0 p-2 text-gray-300 hover:text-yellow-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex">
        {/* <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded md:px-8"
        >
          Login
        </Link> */}
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
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link
            to="/"
            className="hover:text-yellow-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="hover:text-yellow-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/ecosystem"
            className="hover:text-yellow-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ecosystem
          </Link>
          <Link
            to="/blog1"
            className="hover:text-yellow-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/resources"
            className="hover:text-yellow-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <div className="w-full">
            <button className="flex items-center justify-between w-full px-4 py-2 hover:text-yellow-300">
              <span>About</span>
              <span>&#9662;</span>
            </button>
            <div className="bg-black shadow-lg">
              <Link
                to="/about-team"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Our Team
              </Link>
              <Link
                to="/about-mission-vission"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Our Mission
              </Link>
              <Link
                to="/success-stories"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Success Stories
              </Link>
            </div>
          </div>
          {/* <Link
            to="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default NavbarBlack;
