import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('./images/landing.png')", // Replace with your image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-85"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Title Text */}
        <h6 className="text-4xl md:text-5xl font-bold mb-6">
          Are you part of the dynamic <span className="text-yellow-400">Ghana <br/>Startup Association</span> Community?
        </h6>
        <p className="mb-6">
          Join us in fostering innovation and growth through transparent and accountable initiatives
        </p>
       

        {/* Call to Action Buttons */}
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-1 rounded-lg text-lg font-medium">
              Join now
            </button>
          </Link>
          <button className="border-2 border-white text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition flex items-center">
            Get in Touch  <ArrowUpRightIcon className="ml-1 h-7 w-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
