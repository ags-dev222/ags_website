import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import AdminAccess from "./AdminAccess";

// Professional Navbar with theme support
const Navbar = ({ theme = "transparent", fixed = true }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({}); // Define activeDropdowns state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRefs = useRef({}); // Ref for dropdowns
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    // Close dropdowns when clicking outside
    Object.keys(dropdownRefs.current).forEach((key) => {
      if (
        dropdownRefs.current[key] &&
        !dropdownRefs.current[key].contains(event.target)
      ) {
        setActiveDropdowns((prev) => ({ ...prev, [key]: false }));
      }
    });
  };

  const handleDropdownToggle = (dropdownKey) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  // Search functionality
  const searchData = [
    { title: 'Events', path: '/events', type: 'page' },
    { title: 'Blog', path: '/blog1', type: 'page' },
    { title: 'Resources', path: '/resources', type: 'page' },
    { title: 'About Team', path: '/about-team', type: 'page' },
    { title: 'Success Stories', path: '/success-stories', type: 'page' },
    { title: 'Mission & Vision', path: '/about-mission-vission', type: 'page' },
    { title: 'Ecosystem', path: '/ecosystem', type: 'page' },
    { title: 'Join Now', path: '/register', type: 'page' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
  };

  const handleSearchSelect = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0].path);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme configurations
  const themeConfig = {
    transparent: {
      navClass: "bg-gradient-to-b from-black/20 via-black/10 to-transparent backdrop-blur-sm text-white",
      logoSrc: "./images/AGS LOGO 2 1.png",
      hoverBg: "hover:bg-white/20",
      searchBg: "bg-white/20 backdrop-blur-md border-white/30",
      dropdownBg: "bg-gray-900/95 backdrop-blur-md border-gray-700",
      mobileMenuBg: "bg-black/95 backdrop-blur-lg"
    },
    dark: {
      navClass: "bg-gray-900 text-white shadow-xl border-b border-gray-800",
      logoSrc: "./images/AGS LOGO 2 1.png",
      hoverBg: "hover:bg-gray-800",
      searchBg: "bg-gray-800 border-gray-600",
      dropdownBg: "bg-gray-800 border-gray-700 shadow-xl",
      mobileMenuBg: "bg-gray-900"
    },
    light: {
      navClass: "bg-white/95 backdrop-blur-md text-gray-900 shadow-lg border-b border-gray-100",
      logoSrc: "./images/ags-logo1.png",
      hoverBg: "hover:bg-gray-50",
      searchBg: "bg-gray-50 border-gray-200",
      dropdownBg: "bg-white border-gray-200 shadow-xl",
      mobileMenuBg: "bg-white/95 backdrop-blur-lg"
    }
  };

  const currentTheme = themeConfig[theme];
  const navClasses = `${fixed ? 'fixed' : 'relative'} top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 md:px-16 transition-all duration-300 ${currentTheme.navClass}`;

  return (
    <nav className={navClasses}>
      {/* Left Side */}
      <div className="flex space-x-4 items-center md:space-x-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src={currentTheme.logoSrc}
              alt="AGS Logo"
              className="h-10 w-10 md:h-12 md:w-32 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Explore Items as Tabs */}
          <Link
            to="/events"
            className={`px-4 py-2 hover:text-yellow-500 ${currentTheme.hoverBg} rounded transition-all duration-200`}
          >
            Events
          </Link>
          <Link
            to="/ecosystem"
            className={`px-4 py-2 hover:text-yellow-500 ${currentTheme.hoverBg} rounded transition-all duration-200`}
          >
            Ecosystem
          </Link>
          <Link
            to="/blog1"
            className={`px-4 py-2 hover:text-yellow-500 ${currentTheme.hoverBg} rounded transition-all duration-200`}
          >
            Blog
          </Link>
          <Link
            to="/resources"
            className={`px-4 py-2 hover:text-yellow-500 ${currentTheme.hoverBg} rounded transition-all duration-200`}
          >
            Resources
          </Link>

          {/* About Dropdown */}
          <Dropdown
            label="About"
            links={[
              { to: "/about-team", text: "Our Team" },
              { to: "/about-mission-vission", text: "Our Mission" },
              { to: "/success-stories", text: "Success Stories" },
            ]}
            isActive={activeDropdowns.about}
            onToggle={() => handleDropdownToggle("about")}
            dropdownRef={(el) => (dropdownRefs.current.about = el)}
            theme={theme}
          />
        </div>

        {/* Search Icon */}
        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`h-10 border-none p-2 rounded-full bg-transparent transition-all duration-500 ease-in-out ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              } ${
                isSearchOpen ? `w-64 ${currentTheme.searchBg} border px-4` : "w-10"
              }`}
              placeholder={isSearchOpen ? "Search pages..." : ""}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={(e) => {
                // Delay closing to allow click on search results
                setTimeout(() => {
                  if (!e.currentTarget.contains(document.activeElement)) {
                    setIsSearchOpen(false);
                    setSearchResults([]);
                  }
                }, 150);
              }}
            />
            <button
              type="submit"
              className={`absolute right-0 top-0 p-2 hover:text-yellow-500 transition-colors ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}
              onClick={() => {
                if (!isSearchOpen) {
                  setIsSearchOpen(true);
                }
              }}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>
          
          {/* Search Results Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className={`absolute top-12 left-0 w-64 ${currentTheme.dropdownBg} rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto`}>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-3 text-left ${currentTheme.hoverBg} hover:text-yellow-500 transition-colors border-b ${
                    theme === 'light' ? 'border-gray-200 last:border-b-0' : 'border-gray-700 last:border-b-0'
                  } first:rounded-t-lg last:rounded-b-lg`}
                  onClick={() => handleSearchSelect(result.path)}
                >
                  <div className="font-medium">{result.title}</div>
                  <div className={`text-xs capitalize ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>{result.type}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/register">
          <button className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            theme === 'light' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}>
            Join Now
          </button>
        </Link>
        <AdminAccess />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <XMarkIcon className={`h-6 w-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`} />
          ) : (
            <Bars3Icon className={`h-6 w-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`absolute top-16 left-0 w-full ${currentTheme.mobileMenuBg} ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex flex-col items-center space-y-4 py-4 md:hidden shadow-lg`}>
          <Link
            to="/"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {/* Explore Items as Tabs */}
          <Link
            to="/events"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/ecosystem"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ecosystem
          </Link>
          <Link
            to="/blog1"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/resources"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <MobileDropdown
            label="About"
            links={[
              { to: "/about-team", text: "Our Team" },
              { to: "/about-mission-vission", text: "Our Mission" },
              { to: "/success-stories", text: "Success Stories" },
            ]}
            isActive={activeDropdowns.about}
            onToggle={() => handleDropdownToggle("about")}
            theme={theme}
          />
          <Link
            to="/register"
            className="mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

const Dropdown = ({ label, links, isActive, onToggle, dropdownRef, theme = "transparent" }) => {
  const themeConfig = {
    transparent: { dropdownBg: "bg-gray-900 border-gray-700", textColor: "text-gray-200", hoverBg: "hover:bg-gray-800" },
    dark: { dropdownBg: "bg-gray-800 border-gray-700", textColor: "text-gray-200", hoverBg: "hover:bg-gray-700" },
    light: { dropdownBg: "bg-white border-gray-200 shadow-xl", textColor: "text-gray-900", hoverBg: "hover:bg-gray-100" }
  };
  const currentTheme = themeConfig[theme];

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 hover:text-yellow-500 transition-colors"
        aria-expanded={isActive}
        aria-controls={label.toLowerCase()}
      >
        <span>{label}</span>
        <span>&#9662;</span>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute mt-2 w-48 ${currentTheme.dropdownBg} rounded-lg z-50`}
            id={label.toLowerCase()}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 ${currentTheme.textColor} ${currentTheme.hoverBg} hover:text-yellow-500 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg`}
              >
                {link.text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDropdown = ({ label, links, isActive, onToggle, theme = "transparent" }) => {
  const themeConfig = {
    transparent: { dropdownBg: "bg-gray-900 border-gray-700", textColor: "text-gray-200", hoverBg: "hover:bg-gray-800" },
    dark: { dropdownBg: "bg-gray-800 border-gray-700", textColor: "text-gray-200", hoverBg: "hover:bg-gray-700" },
    light: { dropdownBg: "bg-white border-gray-200", textColor: "text-gray-900", hoverBg: "hover:bg-gray-100" }
  };
  const currentTheme = themeConfig[theme];

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-2 hover:text-yellow-500 transition-colors"
        aria-expanded={isActive}
        aria-controls={label.toLowerCase()}
      >
        <span>{label}</span>
        <span>&#9662;</span>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${currentTheme.dropdownBg} shadow-xl rounded-lg mt-2`}
            id={label.toLowerCase()}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 ${currentTheme.textColor} ${currentTheme.hoverBg} hover:text-yellow-500 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg`}
              >
                {link.text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// PropTypes for main Navbar
Navbar.propTypes = {
  theme: PropTypes.oneOf(["transparent", "dark", "light"]),
  fixed: PropTypes.bool,
};

// PropTypes for Dropdown and MobileDropdown
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  dropdownRef: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["transparent", "dark", "light"]),
};

MobileDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["transparent", "dark", "light"]),
};

export default Navbar;
