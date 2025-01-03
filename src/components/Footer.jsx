import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-8">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-2xl bg-green-600 rounded-lg text-white py-6 px-6 text-center">
        <h3 className="text-lg font-bold mb-3">
          Subscribe to our Newsletter to get Updates to our Latest Collection
        </h3>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-md w-64 focus:outline-none text-gray-800"
          />
          <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-r-md hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mx-auto max-w-5xl py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32 text-sm">
          {/* Logo & Description */}
          <div>
            <img
              src="/src/assets/images/ags-logo.png"
              alt="Logo"
              className="h-12 mb-4" // Replace with your logo
            />
            <p>
              Lorem ipsum is simply dummy text of the print typeset industry.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/associationofghanastartups/" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://x.com/ags_ghana" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/agsghana_/" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/agsghana/" className="text-gray-500 hover:text-gray-700">
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
      <div className="bg-gray-200 py-4 text-center text-xs">
        <p>
          Copyright © 2024 | Powered by Association Of Ghana Startups | Developed
          by Frontend Dev Team - AGS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
