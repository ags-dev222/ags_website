import React from "react";

const StatisticsQuoteSection = () => {
  return (
    <section className="bg-gray-100 h-screen">
      {/* Main 4-Grid Layout */}
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        {/* Top Left - Placeholder (e.g., image or blank) */}
        <div className="bg-gray-200">
          <img
            
          />
        </div>

        {/* Top Right - "Fuel..." */}
        <div className="bg-white p-8 flex flex-col justify-center items-start">
          <h2 className="text-2xl font-bold mb-6">
            "Fuel the Growth of Your Startup and Drive Business Innovation"
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">1000+</p>
              <p className="text-gray-500">Members Nationwide</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">$170,000+</p>
              <p className="text-gray-500">Funds Raised</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">250+</p>
              <p className="text-gray-500">Awards</p>
            </div>
          </div>
        </div>

        {/* Bottom Left - "We are..." */}
        <div className="bg-white p-8 flex flex-col justify-center items-start">
          <h2 className="text-2xl font-bold mb-4">
            We’re crafting startups with a touch of global allure.
          </h2>
          <p className="text-gray-600 mb-6">
            We’re sculpting startups to shine on the global stage, igniting
            innovation and fostering success every step of the way.
          </p>
          {/* Smaller Button Aligned Left */}
          <div className="flex justify-start">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700">
              Join Now
            </button>
          </div>
        </div>

        {/* Bottom Right - Placeholder (e.g., image or blank) */}
        <div className="bg-gray-200">
          <img
           
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsQuoteSection;