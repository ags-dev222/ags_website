import Navbar from "./Navbar";
import  { useState } from "react";

const HeroSection = () => {
  const [activeDash, setActiveDash] = useState(1);

  return (
    <div
      className="absolute inset-0 bg-cover bg-blend-overlay h-screen"
      style={{
        backgroundImage: "url('src/assets/images/blog1.jpeg')", // Replace with your image URL
      }}
    >
      <Navbar />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-24">
        {/* Title Text */}
        <h6 className="text-4xl md:text-5xl font-bold mb-4 mt-40">
          Student Initiative receives support to boost <br /> sustainability project
        </h6>

        {/* Click for Details */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          {/* Click for Details Button */}
          <div className="flex items-center space-x-3">
            <span className="text-m hover:text-green-500 cursor-pointer transition-colors duration-300">
              Click here for Details
            </span>
            <div className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full hover:bg-green-500 hover:text-black transition-all duration-300 cursor-pointer">
              <span className="text-white font-bold"> &gt; </span>
            </div>
          </div>

          {/* Three Dashes */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-12 h-1 bg-white transition-all duration-300 ${
                  activeDash === index
                    ? "bg-opacity-100"
                    : "bg-opacity-30"
                }`}
                onMouseEnter={() => setActiveDash(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
