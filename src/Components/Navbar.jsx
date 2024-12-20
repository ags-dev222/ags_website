import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">AGS</Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400">
            About Us
          </Link>
          <Link to="/resources" className="hover:text-yellow-400">
            Resources
          </Link>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            to="/login"
            className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
