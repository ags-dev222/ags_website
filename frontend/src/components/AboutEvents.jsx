import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutEvent = () => {
  const eventFeatures = [
    {
      icon: "🎯",
      title: "Networking Opportunities",
      description: "Connect with like-minded entrepreneurs, investors, and industry leaders from across Ghana and West Africa."
    },
    {
      icon: "💡",
      title: "Learning & Growth",
      description: "Gain insights from expert speakers, participate in workshops, and discover the latest trends in technology and business."
    },
    {
      icon: "🚀",
      title: "Startup Showcase",
      description: "Witness innovative startups pitch their ideas and compete for funding and mentorship opportunities."
    },
    {
      icon: "🤝",
      title: "Partnership Building",
      description: "Find potential co-founders, partners, and collaborators to help grow your business and expand your network."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Why Attend Our <span className="text-yellow-600">Events?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join Ghana's premier startup community and be part of the innovation revolution. Our events are designed to inspire, educate, and connect the next generation of entrepreneurs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Enhanced Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main large image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="./images/aboutevent.jpeg"
                alt="Main Event"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">Innovation in Action</h4>
                <p className="text-sm opacity-90">Experience the future of technology</p>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">500+</div>
                <div className="text-xs text-gray-600">Attendees</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">25+</div>
                <div className="text-xs text-gray-600">Speakers</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What to Expect Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Expert Speakers</h4>
              <p className="text-gray-600 text-sm">Industry leaders sharing insights and experiences</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Innovation Labs</h4>
              <p className="text-gray-600 text-sm">Hands-on workshops and interactive sessions</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Global Connections</h4>
              <p className="text-gray-600 text-sm">Network with entrepreneurs from around the world</p>
            </div>
          </div>
          
          <Link to="/registerevent">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Register for Next Event
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutEvent;
