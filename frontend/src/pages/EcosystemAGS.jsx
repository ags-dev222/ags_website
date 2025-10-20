import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Enhanced Ecosystem Data
const ecosystemData = {
  stats: {
    startups: 1000,
    fundsRaised: 170000,
    awards: 250,
    investors: 50,
    mentors: 75,
    events: 120
  },
  startups: [
    {
      id: 1,
      name: "Zeepay",
      logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "Fintech",
      stage: "Series A",
      location: "Accra Digital Center",
      description: "Revolutionary mobile payment platform connecting Africa to the global economy through innovative financial solutions.",
      founded: "2018",
      employees: "50-100",
      website: "#"
    },
    {
      id: 2,
      name: "FarmGrow",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "AgriTech",
      stage: "Seed",
      location: "Kumasi Hub",
      description: "Smart farming solutions using IoT and AI to increase crop yields and connect farmers to markets.",
      founded: "2020",
      employees: "10-25",
      website: "#"
    },
    {
      id: 3,
      name: "HealthConnect",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "HealthTech",
      stage: "Pre-Seed",
      location: "University of Ghana",
      description: "Telemedicine platform providing healthcare access to rural communities through mobile technology.",
      founded: "2021",
      employees: "5-10",
      website: "#"
    },
    {
      id: 4,
      name: "EduTech Ghana",
      logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "EdTech",
      stage: "Seed",
      location: "MEST Africa",
      description: "Digital learning platform transforming education through personalized AI-powered curriculum.",
      founded: "2019",
      employees: "25-50",
      website: "#"
    },
    {
      id: 5,
      name: "GreenEnergy Solutions",
      logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "CleanTech",
      stage: "Series A",
      location: "Takoradi Tech Hub",
      description: "Solar energy solutions for off-grid communities, bringing sustainable power to rural Ghana.",
      founded: "2017",
      employees: "75-100",
      website: "#"
    },
    {
      id: 6,
      name: "LogiFlow",
      logo: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      category: "Logistics",
      stage: "Seed",
      location: "Tema Industrial Area",
      description: "Smart logistics platform optimizing supply chain management for African businesses.",
      founded: "2020",
      employees: "30-50",
      website: "#"
    }
  ],
  investors: [
    {
      name: "Kwame Osei",
      title: "Managing Partner at AfricaVenture Capital",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      portfolio: "15+ investments",
      focus: "Fintech, HealthTech"
    },
    {
      name: "Akosua Mensah",
      title: "Investment Director at Growth Partners",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      portfolio: "25+ investments",
      focus: "EdTech, AgriTech"
    },
    {
      name: "Yaw Boateng",
      title: "Angel Investor & Serial Entrepreneur",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      portfolio: "30+ investments",
      focus: "CleanTech, Logistics"
    },
    {
      name: "Ama Frimpong",
      title: "Principal at West Africa Fund",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      portfolio: "20+ investments",
      focus: "Early-stage startups"
    }
  ]
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCounter = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        }
      };
      requestAnimationFrame(animateCounter);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

function EcosystemAGS() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All", "Fintech", "AgriTech", "HealthTech", "EdTech", "CleanTech", "Logistics"];
  
  const filteredStartups = ecosystemData.startups.filter(startup => {
    const matchesCategory = selectedCategory === "All" || startup.category === selectedCategory;
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white">
      <Navbar theme="light" />
      
      {/* Hero Section */}
      <section className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Ghana's
                  <span className="text-green-600"> Startup </span>
                  Ecosystem
                </h1>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  Connecting entrepreneurs, investors, and mentors to build the future of innovation in West Africa.
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-green-600">
                    <AnimatedCounter end={ecosystemData.stats.startups} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Active Startups</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600">
                    <AnimatedCounter end={ecosystemData.stats.fundsRaised} prefix="$" />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Funds Raised</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-yellow-600">
                    <AnimatedCounter end={ecosystemData.stats.awards} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Awards Won</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Join Our Ecosystem
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  View Events
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="./images/ecosystem.jpeg"
                  alt="Ghana Startup Ecosystem"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-bold mb-1">Building Tomorrow Together</h3>
                  <p className="text-gray-200 text-sm">
                    Empowering the next generation of entrepreneurs
                  </p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={ecosystemData.stats.mentors} suffix="+" />
                    </div>
                    <div className="text-xs text-gray-600">Expert Mentors</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={ecosystemData.stats.events} suffix="+" />
                    </div>
                    <div className="text-xs text-gray-600">Events Hosted</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Startups Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Featured Startups</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Discover innovative companies that are transforming industries and creating impact across Ghana.
            </p>
          </motion.div>
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search startups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Startups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {startup.name}
                      </h3>
                      <p className="text-sm text-gray-600">{startup.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      startup.category === 'Fintech' ? 'bg-blue-100 text-blue-700' :
                      startup.category === 'AgriTech' ? 'bg-green-100 text-green-700' :
                      startup.category === 'HealthTech' ? 'bg-red-100 text-red-700' :
                      startup.category === 'EdTech' ? 'bg-purple-100 text-purple-700' :
                      startup.category === 'CleanTech' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {startup.category}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {startup.stage}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {startup.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                    <span>Founded: {startup.founded}</span>
                    <span>{startup.employees} employees</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Investors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Investment Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced investors and partners who support our ecosystem with capital, expertise, and mentorship.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecosystemData.investors.map((investor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6 text-center ${
                  index % 2 === 1 ? 'md:mt-8' : ''
                }`}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={investor.image}
                    alt={investor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{investor.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{investor.title}</p>
                <div className="space-y-2">
                  <div className="text-xs text-green-600 font-medium">{investor.portfolio}</div>
                  <div className="text-xs text-gray-500">{investor.focus}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Ghana's Leading Startup Ecosystem?</h2>
            <p className="text-xl mb-8 text-green-100">
              Whether you're a startup founder, investor, or supporter of innovation, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your Journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about-team"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Meet Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default EcosystemAGS;