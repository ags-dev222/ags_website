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
    <footer className="bg-gray-100 text-gray-800 pt-8">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-md sm:max-w-xl lg:max-w-2xl bg-green-700 rounded-lg text-white py-6 px-4 sm:px-6 text-center">
        <h3 className="text-base sm:text-lg font-bold mb-3">
          Subscribe to our Newsletter to get Updates to our Latest Collection
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
          <div className="flex items-center border border-white rounded-full px-3 py-1 w-full sm:w-auto">
            <Mail className="text-white h-5 w-5" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="p-2 sm:p-3 w-full sm:w-64 bg-transparent text-white focus:outline-none placeholder-white"
            />
          </div>
          <button
            className={`px-4 py-2 bg-white font-bold rounded-full transition-all ${
              isValid ? "text-green-900 hover:bg-gray-200" : "text-gray-700 bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Subscribe
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
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
