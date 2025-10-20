import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDownIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroSlides = [
    {
      title: "Empowering Ghana's Startup Ecosystem",
      subtitle: "Join the largest community of entrepreneurs, innovators, and change-makers in Ghana",
      description: "Access funding opportunities, mentorship programs, networking events, and resources to scale your startup to international markets.",
      cta: "Join Our Community",
      ctaSecondary: "Watch Our Story",
      image: "/images/hero-startup-1.jpg",
      stats: [
        { value: "500+", label: "Startups Supported" },
        { value: "$2M+", label: "Funding Connected" },
        { value: "50+", label: "Events Annually" }
      ]
    },
    {
      title: "Innovation Meets Opportunity",
      subtitle: "Connect with investors, mentors, and industry leaders",
      description: "Our platform bridges the gap between innovative startups and growth opportunities, creating pathways to success in the African market and beyond.",
      cta: "Explore Resources",
      ctaSecondary: "View Success Stories",
      image: "/images/hero-innovation-2.jpg",
      stats: [
        { value: "100+", label: "Mentor Network" },
        { value: "25+", label: "Partner Organizations" },
        { value: "15+", label: "Success Stories" }
      ]
    },
    {
      title: "Scale Globally from Ghana",
      subtitle: "Your gateway to international markets",
      description: "Leverage our network of international partners, accelerator programs, and market insights to expand your startup beyond Ghana's borders.",
      cta: "Scale Your Startup",
      ctaSecondary: "Partner With Us",
      image: "/images/hero-global-3.jpg",
      stats: [
        { value: "10+", label: "Countries Reached" },
        { value: "80%", label: "Success Rate" },
        { value: "24/7", label: "Support Available" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
      {/* Background Video/Animation */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-blue-900/75 to-purple-900/90" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              {/* Slide Indicators */}
              <div className="flex justify-center lg:justify-start mb-6 space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-green-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Dynamic Content */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={index === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400' : 'text-white'}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-200 mb-4"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-300 mb-8 max-w-2xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                >
                  <Link
                    to="/register"
                    className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                  
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="group flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {heroSlides[currentSlide].ctaSecondary}
                  </button>
                </motion.div>

                {/* Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-3 gap-8"
                >
                  {heroSlides[currentSlide].stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Image/Graphic */}
              <div className="relative">
                <motion.div
                  className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-4 border-dashed border-white/30 rounded-full flex items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">AGS</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToNextSection}
          className="group flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium">Discover More</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDownIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.div>
        </button>
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            >
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="AGS Story"
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}

      {/* Social Proof Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 p-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center space-x-8">
            <span className="text-white/70 text-sm font-medium">Trusted by leading organizations:</span>
            {['Ghana Gov', 'World Bank', 'UN Women', 'Microsoft', 'Google'].map((org, index) => (
              <motion.span
                key={org}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="text-white/50 text-sm font-medium hover:text-white/70 transition-colors cursor-pointer"
              >
                {org}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernHero;
