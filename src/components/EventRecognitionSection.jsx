// components/EventRecognitionSection.js
const EventRecognitionSection = () => {
  return (
    <section id="events" className="relative bg-gray-50">
      {/* Full-Width Placeholder that touches the top */}
      <div className="w-full h-90 bg-gray-100 flex items-center justify-center">
              <img
                src="./src/assets/images/home2.png"
                alt="Profile"
                className="w-full h-full object-cover "
              />
            </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Tile */}
        <div className="relative z-10 h-80 bg-white p-8 rounded-lg shadow-lg flex items-center justify-between max-w-4xl mx-auto">
          {/* Left Section: Text */}
          <div className="flex-1 pr-4">
            {/* Description */}
            <p className="text-gray-600 mb-4">
              A seasoned professional with expertise in scalable systems and innovative design.<br/>
              A seasoned professional with expertise in scalable systems and innovative design.<br/>
              A seasoned professional with expertise in scalable systems and innovative design.
            </p>

            {/* Horizontal Line */}
            <hr className="border-gray-300 mr-32 mb-4" />

            {/* Name and Position */}
            <div>
              <h2 className="text-sm font-bold text-gray-800">John Doe</h2>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>

          {/* Right Section: Placeholder */}
          <div className="w-36 h-48 bg-yellow-100 flex items-center justify-center rounded-lg overflow-hidden ">
              <img
                src="./src/assets/images/lady.png"
                alt="Profile"
                className="w-full h-full object-cover "
              />
            </div>
        </div>

        {/* Infinity Effect - Background Tiles */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-4/5 h-48 bg-gray-200 rounded-lg absolute transform translate-x-10 translate-y-10"></div>
          <div className="w-3/5 h-40 bg-gray-200 rounded-lg absolute transform -translate-x-10 -translate-y-10"></div>
        </div>
      </div>
    </section>
  );
};

export default EventRecognitionSection;
