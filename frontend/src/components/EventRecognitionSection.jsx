const EventRecognitionSection = () => {
  return (
    <section id="events" className="relative bg-gray-50">
      {/* Full-Width Background Image */}
      {/* <div className="w-full h-[350px] md:h-[400px] lg:h-[450px]">
        <img
          src="./images/home2.png"
          alt="Event Background"
          className="w-full h-full object-cover"
        />
      </div> */}

      <div className="relative max-w-6xl mx-auto px-4 py-16 flex justify-center">
        {/* Background Shadows for Stacking Effect */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-4/5 h-56 bg-gray-200 rounded-xl absolute transform translate-y-16 shadow-md"></div>
          <div className="w-3/5 h-48 bg-gray-300 rounded-xl absolute transform translate-y-8 shadow-lg"></div>
        </div>

        {/* Main Content Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 flex items-center gap-8 max-w-4xl w-full h-auto">
          {/* Left Section: Text */}
          <div className="flex-1">
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.<br />
              A seasoned professional with expertise in scalable systems and innovative design.
            </p>

            {/* Horizontal Line */}
            <hr className="border-gray-300 w-24 mb-3" />

            {/* Name & Position */}
            <h2 className="text-md font-bold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>

          {/* Right Section: Image */}
          <div className="w-40 h-52 bg-yellow-100 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src="./images/lady.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventRecognitionSection;
