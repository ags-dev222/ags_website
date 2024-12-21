import React from "react";

const ManifestoSection = () => {
  return (
    <section className="px-0 py-14 bg-white">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center">
        {/* Left Text Content */}
        <div className="md:w-1/2 md:pr-8 text-center md:text-left">
          <h6 className="text-4xl font-bold mb-3 text-gray-900">Manifesto</h6>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Association of Ghana Startups, known mostly as AGS, is the premium association 
            and mouthpiece of startup entrepreneurs in Ghana, with a mission to build globally 
            competitive startups. AGS works to increase startups' chances of survival, enhance 
            their growth, and reduce collapse rates through engaging seasoned entrepreneurs, 
            government, regulators, financial services providers, and advisory services providers. 
            This creates the necessary environment for startup businesses to scale up and become 
            global brands.
          </p>
          <button className="border-2 border-green-600 text-green-600 px-8 py-1 rounded hover:bg-green-600 hover:text-white transition duration-300">
            Learn more
          </button>
        </div>

        {/* Right Cards or Placeholders */}
        <div className="md:w-1/3 grid grid-cols-2 gap-3 justify-center">
          {/* Top Full-Width Card */}
          <div className="col-span-2 h-40 bg-green-100 rounded"></div>

          {/* Bottom Two Cards */}
          <div className="h-40 bg-green-100 rounded"></div>
          <div className="h-40 bg-green-100 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
