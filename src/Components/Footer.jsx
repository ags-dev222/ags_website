import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div>
            <img src="/logo.png" alt="AGS Logo" className="w-32 mb-4" />
            <p className="text-gray-400">
              Helping startups grow through innovation and dynamic partnerships.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white">Programs</a></li>
              <li><a href="#partners" className="text-gray-400 hover:text-white">Partners</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/associationofghanastartups/?_rdc=1&_rdr" className="hover:text-yellow-400"><FaFacebook /></a>
              <a href="https://x.com/ags_ghana" className="hover:text-yellow-400"><FaTwitter /></a>
              <a href="https://www.linkedin.com/in/agsghana/?originalSubdomain=gh" className="hover:text-yellow-400"><FaLinkedin /></a>
              <a href="#https://www.instagram.com/agsghana_/" className="hover:text-yellow-400"><FaInstagram /></a>
            </div>
          </div>

          {/* Subscription Form */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 mb-4 rounded-lg bg-gray-700 border-none"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 p-3 rounded-lg hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} Association Of Ghana Startups | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
