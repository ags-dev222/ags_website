import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Are you part of the dynamic <span className="text-yellow-400">Ghana Startup Association</span> community?
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Join a powerful network of innovators driving change across the nation.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
            Join Now
          </button>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
