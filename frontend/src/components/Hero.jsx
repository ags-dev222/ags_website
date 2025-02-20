import { Link } from 'react-router-dom';
import { useState } from 'react';

function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 mt-6 sm:mt-8 md:mt-9">
      {/* Left Section */}
      <div className="w-full md:w-1/2 space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">Our Ecosystem</h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Connecting Startups, Investors, and Mentors for a Thriving Future
        </p>

        {/* Stats Section */}
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md flex justify-between max-w-xs sm:max-w-sm">
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold">1000+</p>
            <p className="text-xs text-gray-600">Members Nationwide</p>
          </div>
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold">$170,000+</p>
            <p className="text-xs text-gray-600">Funds Raised</p>
          </div>
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold">250+</p>
            <p className="text-xs text-gray-600">Awards</p>
          </div>
        </div>

        {/* Button */}
        <Link to="/register">
        <button
          className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition"
          onClick={() => setIsOpen(!isOpen)}>
            Join us now
        </button>
        </Link>
        


      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src="./images/ecosystem.jpeg" 
          alt="Startup ecosystem meeting"
          className="w-full max-w-md lg:max-w-lg rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-md"
        />
      </div>
    </div>
  );
}

export default Hero;
