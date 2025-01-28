// components/EventRecognitionSection.js
const SuccessRecognitionSection = () => {
  return (
    <section id="events" className="relative bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 mt-24 mb-16">
        {/* Stacked Tiles */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Tiles for Stacking Effect */}
          <div className="absolute inset-0 -z-10">
            <div className="w-full h-full bg-white rounded-lg shadow-md translate-y-2"></div>
            <div className="w-full h-full bg-white rounded-lg shadow-sm translate-y-4"></div>
            <div className="w-full h-full bg-white rounded-lg shadow-sm translate-y-6"></div>
          </div>

          {/* Main Tile */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg flex items-center space-x-6">
            {/* Left Section: Text */}
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Lorem ipsum is simply dummy text of the print typesetting industry. Lorem ipsum dummy simply dummyunknown Lorem ipsum is simply dummy text of the print typesetting industry.
              </p>

              {/* Horizontal Line */}
              <hr className="border-gray-300 my-4 w-2/3" />

              {/* Name and Position */}
              <div>
                <h2 className="text-sm font-bold text-gray-800">Carolyn Kwame</h2>
                <p className="text-sm text-gray-500">Marketing Director, Nokofio</p>
              </div>
            </div>

            {/* Right Section: Image Placeholder */}
            <div className="w-36 h-48 bg-yellow-100 flex items-center justify-center rounded-lg overflow-hidden ">
              <img
                src="./src/assets/images/lady.png"
                alt="Profile"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessRecognitionSection;
