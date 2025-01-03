import React from "react";

const PartneringSection = () => {
  return (
    <section className="px-8 py-12 bg-gray-100">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Top Partnering <br /> Companies and Institutions
        </h2>
        <p className="text-gray-600">
          We have top collaboration with prestige companies in the world.
        </p>
      </div>

      {/* Grid Layout - Centered with Smaller Width */}
      <div className="max-w-2xl mx-auto grid grid-cols-5 gap-5">
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
        <div className="h-24 w-24 bg-gray-300 rounded"></div>
      </div>
    </section>
  );
};

export default PartneringSection;
