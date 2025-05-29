import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({}); // Define activeDropdowns state
  const dropdownRefs = useRef({}); // Ref for dropdowns

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 text-white md:px-16">
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
          />
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
          {/* Explore Items as Tabs */}
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
          <MobileDropdown
            label="About"
            links={[
              { to: "/about-team", text: "Our Team" },
              { to: "/about-mission-vission", text: "Our Mission" },
              { to: "/success-stories", text: "Success Stories" },
            ]}
            isActive={activeDropdowns.about}
            onToggle={() => handleDropdownToggle("about")}
          />
        </div>
      )}
    </nav>
  );
};

const Dropdown = ({ label, links, isActive, onToggle, dropdownRef }) => {
  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 hover:text-yellow-300"
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
            className="absolute mt-2 w-40 bg-transparent shadow-lg"
            id={label.toLowerCase()}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2 hover:bg-transparent"
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

const MobileDropdown = ({ label, links, isActive, onToggle }) => {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-2 hover:text-yellow-300"
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
            className="bg-transparent shadow-lg"
            id={label.toLowerCase()}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2 hover:bg-transparent"
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
};

export default Navbar;
