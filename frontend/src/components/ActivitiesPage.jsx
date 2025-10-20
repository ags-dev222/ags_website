import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

// API base URL - adjust this based on your backend configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
const API_EVENTS_URL = `${API_BASE_URL}/api/events`;

function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch next event from backend
  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const response = await fetch(`${API_EVENTS_URL}/next`);
        if (response.ok) {
          const event = await response.json();
          setNextEvent(event);
        } else {
          // Fallback to default event if no event found
          setNextEvent({
            title: "Ghana SMEs Startup Week",
            date: "2025-12-31T23:59:59",
            time: "6:00 PM",
            location: "Accra Digital Center"
          });
        }
      } catch (error) {
        console.error('Error fetching next event:', error);
        setError('Failed to load event data');
        // Fallback to default event
        setNextEvent({
          title: "Ghana SMEs Startup Week",
          date: "2025-12-31T23:59:59",
          time: "6:00 PM",
          location: "Accra Digital Center"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNextEvent();
  }, []);

  // Update countdown timer based on fetched event
  useEffect(() => {
    if (!nextEvent) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const eventDate = new Date(nextEvent.date).getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateTimer();

    // Then update every second
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <>
      {/* Fixed Hero Section */}
      <div className="relative w-full h-[85vh] bg-cover bg-center overflow-hidden">
        {/* Background Image with Enhanced Gradient Overlay - Adjusted positioning */}
        <div
          className="absolute bg-cover"
          style={{
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(30, 30, 30, 0.5) 60%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.1) 100%), url('./images/a4ddf4b43eeff3a5c6d72e10b8ad3276.jpg')",
            backgroundPosition: "center top",
          }}
        ></div>
        
        {/* Fill the navbar area with a dark background */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/90 to-transparent"></div>
        
        {/* Subtle animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/10 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Content - Properly positioned below navbar */}
        <div className="relative z-10 flex flex-col justify-center h-full pt-20 px-6 md:px-12 lg:px-20 text-left text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-yellow-500/15 backdrop-blur-sm border border-yellow-500/25 rounded-full px-4 py-2 mb-4"
              >
                <p className="text-sm md:text-base font-semibold text-yellow-400">🎆 PREMIER EVENTS</p>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              >
                {loading ? (
                  <>
                    Ghana SMEs <br/>
                    <span className="text-yellow-400">Startup Week</span>
                  </>
                ) : (
                  <span className="text-yellow-400">
                    {nextEvent?.title || "Ghana SMEs Startup Week"}
                  </span>
                )}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl mt-4 max-w-xl text-gray-200 leading-relaxed mb-6"
              >
                {loading ? (
                  "Join us for transformative events that empower entrepreneurs and spark innovation in Ghana's startup ecosystem."
                ) : (
                  <>Join us {nextEvent?.location && `at ${nextEvent.location} `}for transformative experiences that empower entrepreneurs and spark innovation.</>  
                )}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  to="/registerevent"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center border-2 border-white/80 text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Refined Countdown Timer - Compact and Right-positioned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-4 right-4 sm:right-8 w-auto max-w-xs"
        >
          <div className="bg-black/80 backdrop-blur-sm shadow-lg px-4 py-2 rounded-lg border border-[#c8a415]/50">
            <div className="flex items-center gap-2">
              <div className="text-center hidden sm:block">
                <h3 className="text-xs font-semibold text-[#c8a415] mb-1">
                  Next Event
                </h3>
              </div>
              
              <div className="flex items-center space-x-1">
                {Object.entries(timeLeft).map(([key, value], index, array) => (
                  <div key={key} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[#c8a415] text-black flex flex-col items-center justify-center px-2 py-1 rounded-md min-w-[36px]"
                    >
                      <p className="text-sm font-bold">{value}</p>
                      <p className="capitalize text-[10px]">
                        {key === 'hours' ? 'hrs' : key.slice(0, 3)}
                      </p>
                    </motion.div>
                    {index < array.length - 1 && (
                      <span className="text-white text-xs font-bold mx-1">:</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function EventsOverview() {
  const eventFeatures = [
    {
      icon: "🎯",
      title: "Strategic Networking",
      description: "Connect with 500+ entrepreneurs, investors, and industry leaders from across West Africa.",
      stats: "500+ Participants"
    },
    {
      icon: "💡",
      title: "Innovation Workshops",
      description: "Hands-on sessions covering the latest in fintech, agritech, healthtech, and emerging technologies.",
      stats: "25+ Workshops"
    },
    {
      icon: "🚀",
      title: "Startup Pitch Arena",
      description: "Watch promising startups compete for funding and mentorship opportunities in live pitch battles.",
      stats: "50+ Startups"
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      description: "Celebrate excellence in entrepreneurship with our annual startup awards and recognition ceremony.",
      stats: "10+ Awards"
    }
  ];

  return (
    <>
      {/* Event Highlights Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Enhanced Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="grid grid-cols-2 gap-4 relative">
                {/* Central logo/icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl z-20 flex items-center justify-center border-4 border-white">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Four Different Images with enhanced styling */}
                {[
                  { img: "./images/blog22.jpeg", title: "Innovation" },
                  { img: "./images/blog21.jpeg", title: "Networking" },
                  { img: "./images/chancellor.jpeg", title: "Leadership" },
                  { img: "./images/blog22.jpeg", title: "Growth" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img 
                      src={item.img} 
                      alt={`${item.title} Event`} 
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-xl shadow-lg border">
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">3 Days</div>
                  <div className="text-xs text-gray-600">Of Innovation</div>
                </div>
              </div>
              
              <div className="absolute -top-3 -left-3 bg-white p-3 rounded-xl shadow-lg border">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">₵500K</div>
                  <div className="text-xs text-gray-600">Prize Pool</div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Text Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="mb-4">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium mb-3">
                  🏆 Ghana's Premier Event
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                The Biggest Gathering of 
                <span className="text-yellow-600"> SMEs & Startup </span>
                Entrepreneurs in Ghana
              </h2>
              
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                Ghana SMEs Startup Week brings together the most innovative minds in West Africa's entrepreneurship ecosystem. Experience three transformative days of learning, networking, and collaboration.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600 mb-1">500+</div>
                  <div className="text-gray-600 text-xs">Entrepreneurs</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600 mb-1">50+</div>
                  <div className="text-gray-600 text-xs">Expert Speakers</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600 mb-1">25+</div>
                  <div className="text-gray-600 text-xs">Workshops</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600 mb-1">100+</div>
                  <div className="text-gray-600 text-xs">Investors</div>
                </div>
              </div>
              
              <Link
                to="/registerevent"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Event
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-3">What Makes Our Event Special</h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Discover the unique experiences and opportunities that await you at Ghana SMEs Startup Week
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white hover:from-yellow-50 hover:to-orange-50 border border-gray-100 hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 mb-3 leading-relaxed text-sm">{feature.description}</p>
                <div className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Get Involved Today Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-3">Get Involved Today</h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Choose your path to be part of Ghana's most impactful startup event
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎟️",
                title: "Join as a Participant",
                text: "Register to attend Ghana Startup Week and access all sessions, workshops, and networking events. Be part of a dynamic community of entrepreneurs and industry leaders.",
                button: "Register Now",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: "💼",
                title: "Exhibit Your Startup",
                text: "Showcase your startup at the event and gain visibility among investors, industry experts, and potential customers. Stand out in our startup exhibition area.",
                button: "Apply Now",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50"
              },
              {
                icon: "🤝",
                title: "Become a Sponsor",
                text: "Support Ghana Startup Week and connect with the vibrant startup community. Explore sponsorship opportunities and maximize your brand visibility.",
                button: "Contact Us",
                color: "from-yellow-500 to-orange-500",
                bgColor: "bg-yellow-50"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${item.bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 group`}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{item.text}</p>
                <button className={`w-full py-3 bg-gradient-to-r ${item.color} hover:scale-105 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg`}>
                  {item.button}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


function OtherEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: "AgriTech Innovation Summit",
      date: "2025-03-20",
      time: "10:00 AM",
      location: "University of Ghana, Legon",
      description: "Discover cutting-edge agricultural technologies and meet the startups revolutionizing farming in Ghana. Features live demos, pitch competitions, and networking sessions with agritech experts and investors.",
      image: "./images/blog21.jpeg",
      category: "Summit",
      attendees: "200+",
      featured: true
    },
    {
      id: 2,
      title: "Fintech Founders Meetup",
      date: "2025-02-28",
      time: "6:00 PM",
      location: "MEST Africa, East Legon",
      description: "Monthly gathering of fintech entrepreneurs, developers, and investors. Share experiences, discuss challenges, and explore collaboration opportunities in Ghana's growing fintech space.",
      image: "./images/blog22.jpeg",
      category: "Meetup",
      attendees: "80+",
      featured: false
    },
    {
      id: 3,
      title: "Women in Tech Ghana Conference",
      date: "2025-05-08",
      time: "9:30 AM",
      location: "Kempinski Hotel Gold Coast City",
      description: "Empowering women in technology through inspiring talks, workshops, and networking. Join leading female tech entrepreneurs, engineers, and executives from across Ghana and beyond.",
      image: "./images/chancellor.jpeg",
      category: "Conference",
      attendees: "300+",
      featured: true
    },
    {
      id: 4,
      title: "Blockchain & Crypto Workshop",
      date: "2025-03-15",
      time: "2:00 PM",
      location: "Ghana-India Kofi Annan Centre of Excellence",
      description: "Deep dive into blockchain technology and cryptocurrency trends in Africa. Hands-on workshops, expert panels, and networking with crypto enthusiasts and blockchain developers.",
      image: "./images/blog21.jpeg",
      category: "Workshop",
      attendees: "150+",
      featured: false
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Other <span className="text-yellow-400">Upcoming Events</span>
          </h3>
          <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover more exciting opportunities to connect, learn, and grow with Ghana's thriving startup community throughout the year.
          </p>
        </motion.div>

        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row items-center gap-6 group ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Enhanced Image Container */}
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Overlay badges */}
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                    event.featured ? 'bg-yellow-500' : 'bg-blue-600'
                  }`}>
                    {event.featured ? '⭐ Featured' : event.category}
                  </span>
                </div>
                
                <div className="absolute top-6 right-6">
                  <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium">
                    {event.attendees} attendees
                  </span>
                </div>
                
                {/* Date overlay on hover */}
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full">
                    <span className="font-bold">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Event Details */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    {event.featured && (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        🔥 Hot Event
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {event.title}
                  </h4>
                  
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })} at {event.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/registerevent"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Register Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button className="inline-flex items-center justify-center border-2 border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get notified about new events and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
              <Link
                to="/events"
                className="border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white px-6 py-2 rounded-lg transition-colors"
              >
                All Events
              </Link>
            </div>
          </div>
        </motion.div>
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
