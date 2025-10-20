import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  RocketLaunchIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LightBulbIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Startup Acceleration",
      description: "Fast-track your startup growth with our comprehensive acceleration programs designed for the African market.",
      details: "Join our 6-month intensive program featuring weekly mentorship sessions, pitch training, market validation support, and direct access to investors.",
      stats: { value: "85%", label: "Success Rate" },
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Funding Access",
      description: "Connect with investors, VCs, and funding opportunities tailored to Ghana's startup ecosystem.",
      details: "Access our network of 50+ investors, including angel investors, VCs, and development finance institutions focused on African markets.",
      stats: { value: "$2.5M", label: "Avg Funding" },
      color: "from-green-400 to-green-600"
    },
    {
      icon: UsersIcon,
      title: "Mentorship Network",
      description: "Get guidance from experienced entrepreneurs, industry experts, and successful business leaders.",
      details: "1-on-1 mentoring with 100+ seasoned entrepreneurs who have successfully scaled businesses in Ghana and across Africa.",
      stats: { value: "100+", label: "Expert Mentors" },
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: AcademicCapIcon,
      title: "Skill Development",
      description: "Master essential business skills through workshops, courses, and hands-on training programs.",
      details: "Comprehensive curriculum covering business strategy, digital marketing, financial planning, and leadership development.",
      stats: { value: "50+", label: "Courses Available" },
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: GlobeAltIcon,
      title: "Market Expansion",
      description: "Scale beyond Ghana with international market insights and expansion support.",
      details: "Strategic guidance for expanding to other African markets and global opportunities with partner networks.",
      stats: { value: "15+", label: "Countries Reached" },
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: ChartBarIcon,
      title: "Performance Analytics",
      description: "Track your progress with comprehensive analytics and business intelligence tools.",
      details: "Real-time dashboards, KPI tracking, market analysis, and personalized growth recommendations.",
      stats: { value: "24/7", label: "Analytics Access" },
      color: "from-teal-400 to-teal-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-800 mb-4"
          >
            <LightBulbIcon className="w-5 h-5 mr-2" />
            Empowering Innovation
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Succeed
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support system designed to transform your innovative ideas into successful, 
            scalable businesses that make a real impact in Ghana and beyond.
          </p>
        </motion.div>

        {/* Interactive Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`group relative cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white shadow-xl scale-105 border-l-4 border-green-500' 
                      : 'bg-white/50 hover:bg-white hover:shadow-lg border-l-4 border-transparent'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="mt-4 flex items-center space-x-4">
                          <div className="text-2xl font-bold text-green-600">
                            {feature.stats.value}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feature.stats.label}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`transition-all duration-300 ${
                        activeFeature === index ? 'text-green-500' : 'text-gray-300 group-hover:text-green-400'
                      }`}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="sticky top-24"
          >
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              {/* Feature Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center mb-6`}>
                <features[activeFeature].icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Feature Content */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {features[activeFeature].title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {features[activeFeature].details}
              </p>
              
              {/* Feature Stats */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Success Metric:</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      {features[activeFeature].stats.value}
                    </div>
                    <div className="text-sm text-gray-500">
                      {features[activeFeature].stats.label}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About {features[activeFeature].title}
              </motion.button>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-xl opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full blur-xl opacity-20" />
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <HandRaisedIcon className="w-16 h-16 mx-auto mb-6 text-green-200" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Startup?
              </h3>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who have accelerated their growth with AGS. 
                Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
