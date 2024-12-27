import React from "react";

const ManifestoSection = () => {
  return (
    <section className="px-0 py-14 bg-gray-100">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Left Text Content */}
        <div className="md:w-1/2 md:pr-8 text-left">
          <h6 className="text-4xl font-bold mb-3 text-gray-900">About the Event</h6>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Association of Ghana Startups, known mostly as AGS, is the premium association
            and mouthpiece of startup entrepreneurs in Ghana, with a mission to build globally
            competitive startups. AGS works to increase startups' chances of survival, enhance
            their growth, and reduce collapse rates through engaging seasoned entrepreneurs,
            government, regulators, financial services providers, and advisory services providers.
            This creates the necessary environment for startup businesses to scale up and become
            global brands.
          </p>
          <button className="border-2 border-green-600 bg-green-600 text-sm text-white px-8 py-1 rounded hover:bg-green-600 hover:text-white transition duration-300">
            Register Now
          </button>
        </div>

        {/* Right Cards or Placeholders */}
        <div className="md:w-1/3 grid grid-cols-1 gap-2 md:ml-10"> {/* Added horizontal margin */}
          {/* Top Full-Width Card */}
          <div className="col-span-1 h-40 bg-green-100 rounded"></div>

          {/* Middle Card (Shifted Left) */}
          <div className="h-40 bg-green-100 rounded -ml-16 mr-16"></div>

          {/* Bottom Card */}
          <div className="h-40 bg-green-100 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
