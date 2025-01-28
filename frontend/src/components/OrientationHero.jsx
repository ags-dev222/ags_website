import { ArrowUpRightIcon } from "@heroicons/react/20/solid";


const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-100"></div>

      {/* Content */}
<div className="relative z-10 ml-24 flex flex-col items-start justify-center h-full text-left text-white px-4">
  {/* Title Text */}
  <h6 className="text-4xl md:text-5xl font-bold mb-6">
    Orientation & <br/><span className="text-yellow-400">Welcoming </span>of Freshers
  </h6>
  <p className="mb-6">
    Join us for the CITSA Fresher and Orientation Event! Meet fellow students, <br/>discover our clubs and get a great start to your university
    journey with CITSA.
  </p>
  <h3 className="text-2xl md:text-2xl font-bold mb-6">
    October 22-31, 2024 | 6PM
  </h3>
       

        {/* Call to Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-1 rounded-lg text-sm font-medium">
            Register to attend
          </button>
          <button className="border-2 border-white text-white px-6 py-1 rounded-lg text-m font-medium hover:bg-white hover:text-black transition flex items-center">
            Become a sponsor  <ArrowUpRightIcon className="ml-1 h-7 w-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
