import React, { useState } from "react";

const LookupSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false); // State for Investor Section

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently active accordion
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };

  const toggleInvestorSection = () => {
    setIsInvestorOpen((prev) => !prev); // Toggle Investor Section
  };

  return (
    <section className="px-8 py-12 bg-gray-900 text-white">
      <div className="max-w-screen-lg mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Here is our Lookups</h2>
          <p className="text-gray-300">
            We have top collaboration with prestige companies in the world
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {/* Accordion Items */}
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <button
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between w-full p-4 text-left text-gray-700 bg-white border border-gray-700 rounded hover:bg-gray-400"
              >
                <span>ACS Ecosystem Platform</span>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-700 rounded-b">
                  <p>Details about the ACS Ecosystem Platform...</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Investor Lookup Section */}
        <div>
          <button
            onClick={toggleInvestorSection}
            className="flex items-center justify-between w-full p-4 text-left text-gray-700 bg-white border border-gray-700 rounded hover:bg-gray-400"
          >
            <h3 className="text-xl font-semibold">Investor</h3>
            <span>{isInvestorOpen ? "-" : "+"}</span>
          </button>
          {isInvestorOpen && (
            <div className="bg-white text-gray-700 p-6 rounded-b shadow-lg">
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* Reduced Width Image Grid */}
                <div className="col-span-1 bg-gray-200 rounded-md h-40"></div>

                {/* Links Section */}
                <div className="mr-40 ml-40 col-span-3 flex flex-col justify-center space-y-4">
                  {/* Look Up Startups */}
                  <a
                    href="#"
                    className="block text-green-500 hover:text-gray-400 transition duration-300 flex items-center"
                  >
                    Look up Startups
                    <span className="ml-64 text-lg text-gray-700">⟶</span>
                  </a>
                  <hr className="border-t border-gray-300" /> {/* Divider Line */}
                  {/* Read Sector Insight */}
                  <a
                    href="#"
                    className="block text-green-500 hover:text-gray-400 transition duration-300 flex items-center"
                  >
                    Read Sector Insight
                    <span className="ml-60 text-lg text-gray-700">⟶</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LookupSection;
