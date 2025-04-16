import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2025-12-31T23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[874px] bg-cover bg-center">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(30deg, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0) 100%), url('./images/a4ddf4b43eeff3a5c6d72e10b8ad3276.jpg')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 text-left text-white">
          <p className="text-xl md:text-2xl font-semibold text-yellow-400">Events</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Ghana SMEs Startup Week
          </h1>
          <p className="text-lg md:text-xl mt-2 max-w-lg">
            Join us for events that empower entrepreneurs and spark innovation.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="w-[90%] max-w-2xl h-[88px] absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-yellow-500 shadow-lg p-4 rounded-[30px] flex justify-between items-center z-20">
          <p className="text-lg font-semibold text-white ml-4">
            Make sure you don&apos;t <br/> miss out on this event.
          </p>

          <div className="flex items-center space-x-2">
            {Object.entries(timeLeft).map(([key, value], index, array) => (
              <div key={key} className="flex items-center pr-1">
                <div className="h-[70px] w-[60px] bg-black text-white flex flex-col items-center justify-center px-4 py-2 rounded-lg">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="capitalize text-sm">{key}</p>
                </div>
                {index < array.length - 1 && <span className="text-black text-2xl font-bold">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function EventsOverview() {
  return (
    <>
      {/* Event Highlights Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          {/* Image Grid */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 relative">
            {/* Centered Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg z-10"></div>

            {/* Four Different Images */}
            {[
              "./images/blog22.jpeg",
              "./images/blog21.jpeg",
              "./images/chancellor.jpeg",
              "./images/blog22.jpeg",
            ].map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Event ${index + 1}`} className="rounded-lg w-full h-auto" />
              </div>
            ))}
          </div>

          {/* Text Block */}
          <div className="w-full md:w-1/2 align-text-top ml-4">
            <h2 className="text-4xl font-bold mb-4">
              The Biggest Gathering of <br/> SMEs & Startup <br/> Entrepreneurs <br/> in Ghana
            </h2>
            <p className="text-gray-600 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at sapien non tellus tincidunt fermentum.
              Integer fringilla euismod dolor, eget tristique arcu volutpat vitae. <br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at sapien non tellus tincidunt fermentum.
              Integer fringilla euismod dolor, eget tristique arcu volutpat vitae.<br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at sapien non tellus tincidunt fermentum.
              Integer fringilla euismod dolor, eget tristique arcu volutpat vitae.
            </p>
          </div>
        </div>
      </section>

      {/* Get Involved Today Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-10">Get Involved Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Join as a Participant",
                text: "Register to attend Ghana Startup Week and access all sessions, workshops, and networking events. Be part of a dynamic community of entrepreneurs and industry leaders.",
                button: "Register",
              },
              {
                title: "Exhibit Your Startup",
                text: "Showcase your startup at the event and gain visibility among investors, industry experts, and potential customers.",
                button: "Apply",
              },
              {
                title: "Become a Sponsor",
                text: "Support Ghana Startup Week and connect with the vibrant startup community. Explore sponsorship opportunities and benefits.",
                button: "Contact",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center min-h-[250px]">
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-gray-600 flex-grow">{item.text}</p>
                <button className="mt-4 w-[150px] py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  {item.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


function OtherEvents() {
  return (
    <section className="container mx-auto px-6 py-16 bg-[#2A2A2A]">
      <h3 className="text-2xl font-bold text-white mb-2 pl-10">Other Events Schedules</h3>
      <p className="text-gray-400 mb-6 pl-10">
        Our Major Upcoming Events With Dates And Brief Descriptions.
      </p>

      <div className="space-y-6">
        {Array(2).fill(0).map((_, index) => (
          <div key={index} className="flex items-center gap-4 pl-25">
            {/* Image Container (Correct Size) */}
            <div className="w-[300px] h-[220px] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="./images/blog21.jpeg"
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details (Matches Height of Image) */}
            <div className="bg-[#1A1F1F] p-5 rounded-lg shadow-lg  h-[220px] w-180 flex flex-col justify-center">
              <h4 className="font-bold text-white text-lg">
                Freshers General Meeting onsite
              </h4>
              <p className="text-yellow-400 text-sm mt-1">
                26.08.2024 | <span className="text-yellow-400">6:00PM</span>
              </p>
              <p className="text-gray-400 text-sm mt-2 leading-snug">
                Explore the diverse clubs at CITSA, where students connect, develop new 
                skills, and collaborate on exciting projects. Join today to make the most 
                of your university experience!
              </p>
              <a href="#" className="text-gray-300 underline mt-2 inline-block">
                Event Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 text-white flex items-center gap-2 pl-10">
        <p className="text-sm">Page 1</p>
        <span className="text-xl">»</span>
      </div>
    </section>
  );
}



const ActivitiesPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <EventsOverview />
      <OtherEvents />
    </div>
  );
};

export default ActivitiesPage;
