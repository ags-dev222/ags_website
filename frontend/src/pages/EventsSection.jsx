import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrientationHero from '../components/OrientationHero';
import AboutEvents from '../components/AboutEvents';
import DiscussionSection from '../components/DiscussionSection';
import Navbar from '../components/Navbar';

const events = [
  {
    id: 1,
    title: "Ghana Startup Week 2025",
    date: "2025-04-15",
    time: "09:00 AM",
    location: "Accra International Conference Centre",
    description: "The largest startup event in West Africa brings together entrepreneurs, investors, and innovators for a week of networking, learning, and collaboration. Join 500+ startups and industry leaders.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Conference",
    price: "Free",
    speakers: 25,
    attendees: 500,
    featured: true,
    tags: ["Networking", "Innovation", "Investment"]
  },
  {
    id: 2,
    title: "AgriTech Innovation Summit",
    date: "2025-03-20",
    time: "10:00 AM",
    location: "University of Ghana, Legon",
    description: "Discover cutting-edge agricultural technologies and meet the startups revolutionizing farming in Ghana. Features live demos, pitch competitions, and networking with agritech experts.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Summit",
    price: "GH₵50",
    speakers: 15,
    attendees: 200,
    featured: false,
    tags: ["Agriculture", "Technology", "Innovation"]
  },
  {
    id: 3,
    title: "Fintech Founders Meetup",
    date: "2025-02-28",
    time: "06:00 PM",
    location: "MEST Africa, East Legon",
    description: "Monthly gathering of fintech entrepreneurs, developers, and investors. Share experiences, discuss challenges, and explore collaboration opportunities in Ghana's growing fintech space.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Meetup",
    price: "Free",
    speakers: 8,
    attendees: 80,
    featured: false,
    tags: ["Fintech", "Networking", "Finance"]
  },
  {
    id: 4,
    title: "Women in Tech Ghana Conference",
    date: "2025-05-08",
    time: "09:30 AM",
    location: "Kempinski Hotel Gold Coast City",
    description: "Empowering women in technology through inspiring talks, workshops, and networking. Join leading female tech entrepreneurs, engineers, and executives from across Ghana and beyond.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Conference",
    price: "GH₵100",
    speakers: 20,
    attendees: 300,
    featured: true,
    tags: ["Women in Tech", "Empowerment", "Leadership"]
  },
  {
    id: 5,
    title: "Blockchain & Crypto Workshop",
    date: "2025-03-15",
    time: "02:00 PM",
    location: "Ghana-India Kofi Annan Centre of Excellence",
    description: "Deep dive into blockchain technology and cryptocurrency trends in Africa. Hands-on workshops, expert panels, and networking with crypto enthusiasts and blockchain developers.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Workshop",
    price: "GH₵75",
    speakers: 12,
    attendees: 150,
    featured: false,
    tags: ["Blockchain", "Cryptocurrency", "Technology"]
  },
  {
    id: 6,
    title: "Startup Pitch Competition 2025",
    date: "2025-06-12",
    time: "10:00 AM",
    location: "National Theatre of Ghana",
    description: "Ghana's premier startup pitch competition where early-stage startups compete for funding, mentorship, and market opportunities. Prize pool of $50,000 in funding and resources.",
    image: "./images/ott.jpeg",
    link: "/registerevent",
    category: "Competition",
    price: "Free for startups, GH₵25 for audience",
    speakers: 10,
    attendees: 400,
    featured: true,
    tags: ["Pitch Competition", "Funding", "Startups"]
  }
];

// Enhanced Statistics Data
const eventStats = {
  totalEvents: 50,
  totalAttendees: 12500,
  successfulStartups: 150,
  fundingRaised: "$2.5M"
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const target = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <span className="text-4xl md:text-5xl font-bold text-yellow-400">
      {typeof value === 'string' && value.includes('$') ? '$' : ''}
      {count.toLocaleString()}
      {typeof value === 'string' && value.includes('M') ? 'M' : ''}
      {suffix}
    </span>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center space-x-4 mb-8"
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center min-w-[100px] border border-white/20">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{value}</div>
          <div className="text-sm text-gray-300 capitalize font-medium">{unit}</div>
        </div>
      ))}
    </motion.div>
  );
};

const EventsSection = () => {
  const nextEvent = events.find(event => event.featured) || events[0]; // First featured event for countdown
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleEvents, setVisibleEvents] = useState(6);
  
  // Get unique categories from events
  const categories = ['all', ...new Set(events.map(event => event.category.toLowerCase()))];
  
  // Filter events based on selected category
  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category.toLowerCase() === selectedCategory);
  
  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 3);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Navbar theme="transparent" />
      
      {/* Hero Section with Countdown */}
      <div className="relative pt-20">
        <OrientationHero />
        
        {/* Featured Event Countdown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="text-yellow-400 font-semibold text-sm">🎉 FEATURED EVENT</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                {nextEvent.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{nextEvent.location}</p>
              <p className="text-lg text-yellow-400 mb-8 font-medium">
                {new Date(nextEvent.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {nextEvent.time}
              </p>
              <CountdownTimer targetDate={nextEvent.date} />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={nextEvent.link}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Register Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-400">Driving Ghana's startup ecosystem forward</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatedCounter value={eventStats.totalEvents} suffix="+" />
              <p className="text-gray-400 mt-2 font-medium">Events Hosted</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedCounter value={eventStats.totalAttendees} suffix="+" />
              <p className="text-gray-400 mt-2 font-medium">Total Attendees</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedCounter value={eventStats.successfulStartups} suffix="+" />
              <p className="text-gray-400 mt-2 font-medium">Startups Launched</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedCounter value={eventStats.fundingRaised} />
              <p className="text-gray-400 mt-2 font-medium">Funding Raised</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <AboutEvents />
      <DiscussionSection />
      
      {/* Enhanced Events Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Join Ghana's most impactful startup events. Connect with entrepreneurs, investors, and innovators shaping the future of West Africa's technology landscape.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 capitalize ${
                    selectedCategory === category
                      ? "bg-yellow-500 text-black shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  {category === 'all' ? 'All Events' : category}
                </button>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.slice(0, visibleEvents).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-3 border border-gray-700 hover:border-yellow-500/50"
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                      event.featured ? 'bg-yellow-500' : 'bg-green-600'
                    }`}>
                      {event.featured ? '⭐ Featured' : event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium">
                      {event.price}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Tags overlay */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-white/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Event Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 text-sm font-medium">{event.category}</span>
                    {event.featured && (
                      <span className="text-yellow-500 text-xs font-bold bg-yellow-500/20 px-2 py-1 rounded">
                        HOT
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors leading-tight">
                    {event.title}
                  </h3>
                  
                  {/* Event Meta */}
                  <div className="space-y-3 mb-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })} at {event.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Event Stats */}
                  <div className="flex items-center justify-between mb-8 p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{event.speakers}</div>
                      <div className="text-xs text-gray-400">Speakers</div>
                    </div>
                    <div className="w-px h-8 bg-gray-600"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{event.attendees}+</div>
                      <div className="text-xs text-gray-400">Attendees</div>
                    </div>
                    <div className="w-px h-8 bg-gray-600"></div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{event.price}</div>
                      <div className="text-xs text-gray-400">Price</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={event.link}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black text-center py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                    >
                      Register Now
                    </Link>
                    <button className="px-6 py-4 border border-gray-600 hover:border-yellow-500 text-gray-300 hover:text-yellow-500 rounded-xl transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load More Button */}
          {filteredEvents.length > visibleEvents && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <button
                onClick={loadMoreEvents}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 border border-gray-600 hover:border-yellow-500"
              >
                Load More Events
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
