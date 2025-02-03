import { Link } from "react-router-dom";
const AboutEvent = () => {
  return (
    <div className="bg-[#F8F5EC] flex items-center justify-center py-16 px-8 pt-180">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Event</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link to="/registerevent">
            <button className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-md transition">
              Register Now
            </button>
          </Link>
        </div>

        {/* Right Side: Split Image Effect */}
        <div className="grid grid-rows-3 gap-3">
          {/* Top section */}
          <div className="overflow-hidden rounded-lg">
            <img
              src="src/assets/images/aboutevent.jpeg"
              alt="Event"
              className="w-100 h-24 md:h-28 object-cover object-top"
            />
          </div>
          
          {/* Middle section */}
          <div className="overflow-hidden rounded-lg">
            <img
              src="src/assets/images/aboutevent.jpeg"
              alt="Event"
              className="w-100 h-24 md:h-28 object-cover object-center"
            />
          </div>

          {/* Bottom section */}
          <div className="overflow-hidden rounded-lg">
            <img
              src="src/assets/images/aboutevent.jpeg"
              alt="Event"
              className="w-100 h-24 md:h-28 object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEvent;
