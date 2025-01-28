import Navbar from "./Navbar";
function ActivitiesPage() {
  return (
    <div>
      {/* Header Section */}
      <header
        className="relative bg-gray-900 text-white bg-cover bg-center pt-9 pb-45" // Add padding to the top and bottom
        style={{
          backgroundImage: `url('a4ddf4b43eeff3a5c6d72e10b8ad3276.jpg')`,
        }}
      >
        {/* Dark transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <p className="text-3xl text-yellow-500 font-bold underline">
            Our Activities
          </p>
          <h1 className="text-4xl font-bold mb-4">
            Ghana SMEs Startup Week
          </h1>
          <p className="text-lg">
            Join us for events that empower entrepreneurs and spark
            innovation.
          </p>
          <div className="mt-6 flex justify-center space-x-4" id="countdown">
            <div className="bg-yellow-500 text-gray-900 rounded px-6 py-4 text-center">
              <p className="text-2xl font-bold" id="days">
                100
              </p>
              <p>Days</p>
            </div>
            <div className="bg-yellow-500 text-gray-900 rounded px-6 py-4 text-center">
              <p className="text-2xl font-bold" id="hours">
                10
              </p>
              <p>Hours</p>
            </div>
            <div className="bg-yellow-500 text-gray-900 rounded px-6 py-4 text-center">
              <p className="text-2xl font-bold" id="minutes">
                30
              </p>
              <p>Minutes</p>
            </div>
            <div className="bg-yellow-500 text-gray-900 rounded px-6 py-4 text-center">
              <p className="text-2xl font-bold" id="seconds">
                45
              </p>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </header>

      {/* Event Highlights Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Event Highlights</h2>
          <p className="text-gray-400 mb-6">
            Here are some highlights of our past events and gatherings that empowered entrepreneurs and created new opportunities in Ghana&apos;s startup ecosystem.
          </p>
          {/* Circle at the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full"></div>
          </div>
          {/* Image 1 */}
          <div className="flex justify-center">
            <img
              src="251128ea2038ca538606b85c8883e7a7.jpg"
              alt="Event 1"
              className="rounded-lg"
            />
          </div>
          {/* Image 2 */}
          <div className="flex justify-center">
            <img
              src="2d54544b38332eb39a5b5c5662db42d2.jpg"
              alt="Event 2"
              className="rounded-lg"
            />
          </div>
          {/* Image 3 */}
          <div className="flex justify-center">
            <img
              src="dbb215679185008b37067399a32e1175.jpg"
              alt="Event 3"
              className="rounded-lg"
            />
          </div>
          {/* Image 4 */}
          <div className="flex justify-center">
            <img
              src="73baa19000be14490d605ae090e55777.jpg"
              alt="Event 4"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Get Involved Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Join as a Participant</h4>
              <p className="text-gray-600">
                Register and attend Ghana SMEs Startup Week to grow your
                knowledge, network, and career.
              </p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Register
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Exhibit Your Startup</h4>
              <p className="text-gray-600">
                Showcase your startup to potential investors and partners.
              </p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Exhibit
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Become a Sponsor</h4>
              <p className="text-gray-600">
                Support the event and gain visibility for your brand.
              </p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Sponsor
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

function OtherEvents() {
  return (
    <section
      className="container mx-auto px-4 py-16"
      style={{ backgroundColor: '#2A2A2A' }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-white">
        Other Events Schedules
      </h3>
      <div className="space-y-6">
        {/* Event 1 */}
        <div className="flex items-center space-x-4">
           {/* Image */}
           <div className="bg-gray-100 p-6 rounded-lg shadow">
            <img
              src="a898691727c85fc52181a277b69d659e.jpg"
              alt="Event"
              className="rounded-lg w-32 h-32"   />
               </div>
          {/* Text Content with background color #1A1F1F */}
          <div
            className="bg-[#1A1F1F] p-6 rounded-lg shadow"
            style={{ backgroundColor: '#1A1F1F' }}
          >
            <h4 className="font-bold text-white">Freshers General Meeting Onsite</h4>
            <p className="text-gray-400">26-08-2024 | 6:00PM</p>
            <p className="text-gray-400">Engaging new ideas with CTFM, where students connect, network, 
              and learn about career-building opportunities.</p>
            <a href="#" className="text-green-600 underline mt-2 block">
              Event Details
            </a>
          </div>
        </div>
        {/* Event 2 */}
        <div className="flex items-center space-x-4">
          {/* Image */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <img
              src="a898691727c85fc52181a277b69d659e.jpg"
              alt="Event"
              className="rounded-lg w-32 h-32"/>
               </div>
          {/* Text Content with background color #1A1F1F */}
          <div
            className="bg-[#1A1F1F] p-6 rounded-lg shadow"
            style={{ backgroundColor: '#1A1F1F' }}>
            <h4 className="font-bold text-white">Freshers General Meeting Onsite</h4>
            <p className="text-gray-400">26-08-2024 | 6:00PM</p>
            <p className="text-gray-400">
              Engaging new ideas with CTFM, where students connect, network,
              and learn about career-building opportunities.
            </p>
            <a href="#" className="text-green-600 underline mt-2 block" >
              Event Details</a>
          </div>
        </div>
      </div>
      {/* Next Button */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="bg-green-600 text-white py-2 px-6 rounded-full text-lg hover:bg-green-700 transition"
        >
          Next &gt;&gt;
        </a>
      </div>
    </section>
  );
}

const EventPageContent = () => {
  return (
    <div>
      {/* Event Page Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white">Event Page</h1>
          <p className="text-white mt-4">
            Details about the event go here.
          </p>
        </div>
      </div>
      
    </div>
  );
};

function App() {
  return (
    <div>
      <Navbar />
      <ActivitiesPage />
      <OtherEvents />
      <EventPageContent />
    </div>
  );
}

export default App;














