import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Email Validation Function
  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
      setError("Email is required.");
      setIsValid(false);
    } else if (!emailRegex.test(input)) {
      setError("Please enter a valid email.");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  return (
    <footer className="bg-gray-50 text-gray-800">
      {/* Simple Newsletter Section */}
      <div className="bg-gray-800 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Get the latest startup news and event updates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isValid 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              Subscribe
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mx-auto max-w-5xl py-8 sm:py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16 lg:gap-24 text-xs sm:text-sm">
          {/* Logo & Description */}
          <div>
            <img
              src="./images/ags-logo1.png"
              alt="Logo"
              className="mb-4"
            />
            <p>
              Lorem ipsum is simply dummy text of the print typeset industry.
            </p>
            <div className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
              <a
                href="https://www.facebook.com/associationofghanastartups/"
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://x.com/ags_ghana" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/agsghana_/"
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/agsghana/"
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Activities
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5174/login"
                  className="hover:underline text-green-700 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold mb-3">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Ghana Startup Week
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Portfolio
                </a>
              </li>
              <li>
                <Link to="/events" className="hover:underline">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li>+233 24 315 8077</li>
              <li>agsghana@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 py-3 sm:py-4 text-center text-xs">
        <p>
          Copyright © {new Date().getFullYear()} | Powered by Association Of Ghana Startups | Developed
          by Frontend Dev Team - AGS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
