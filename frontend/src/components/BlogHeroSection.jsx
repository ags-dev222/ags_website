import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BlogHeroSection = () => {
  const [activeDash, setActiveDash] = useState(0);
  
  // Carousel images data
  const carouselImages = [
    {
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      title: "Discover the Latest in",
      highlight: "Ghana's Startup",
      subtitle: "Stay updated with insights, success stories, and innovations shaping the future of entrepreneurship in Ghana.",
      category: "Featured Story"
    },
    {
      image: "./images/blog1.jpeg", // Your original blog image
      title: "Student Initiative receives",
      highlight: "Sustainability Support",
      subtitle: "Innovative projects driving environmental change and social impact across Ghana's educational institutions.",
      category: "Impact Story"
    },
    {
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      title: "Celebrating Excellence in",
      highlight: "Entrepreneurship",
      subtitle: "Recognizing outstanding startups and their contributions to Ghana's growing innovation ecosystem.",
      category: "Awards & Recognition"
    }
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDash((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const currentSlide = carouselImages[activeDash];
  
  return (
    <div className="relative w-full h-[75vh] min-h-[600px] overflow-hidden mt-20">
      {/* Carousel Background Images */}
      {carouselImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === activeDash ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 py-20">
        {/* Category Badge */}
        <motion.div
          key={`badge-${activeDash}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-medium">
            {currentSlide.category}
          </span>
        </motion.div>

        {/* Title Text */}
        <motion.h1
          key={`title-${activeDash}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl"
        >
          {currentSlide.title}
          <span className="text-yellow-400"> {currentSlide.highlight} </span>
          Ecosystem
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`subtitle-${activeDash}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
        >
          {currentSlide.subtitle}
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Call to Action Button */}
          <button className="group flex items-center space-x-3 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
            <span className="text-white font-semibold">Explore Our Stories</span>
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full group-hover:bg-white group-hover:text-green-600 transition-all duration-300">
              <span className="font-bold text-sm">→</span>
            </div>
          </button>

          {/* Navigation Dots */}
          <div className="flex space-x-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeDash === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => setActiveDash(index)}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Carousel Navigation Arrows */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setActiveDash(activeDash === 0 ? carouselImages.length - 1 : activeDash - 1)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setActiveDash((activeDash + 1) % carouselImages.length)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogHeroSection;
