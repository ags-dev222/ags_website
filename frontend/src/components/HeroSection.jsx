import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const images = [
    "./images/landing.png",
    "./images/orientation.jpeg",
    "./images/dbb215679185008b37067399a32e1175.jpg",
    "./images/chancellor.jpeg",
    "./images/251128ea2038ca538606b85c8883e7a7.jpg",
    "./images/2d54544b38332eb39a5b5c5662db42d2.jpg",
  ]; // Array of image URLs

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slower transition speed (1 second)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds per slide
    fade: true, // Enable fade effect for smooth transitions
    cssEase: "ease-in-out", // Modern easing for smoother transitions
    arrows: false,
  };

  return (
    <div className="relative h-screen">
      {/* Carousel as Background */}
      <Slider {...settings} className="absolute inset-0 h-full">
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url('${image}')`,
              }}
            ></div>
          </div>
        ))}
      </Slider>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content on Top of Carousel */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6 max-w-5xl mx-auto">
        {/* Title Text */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Join the dynamic{" "}
          <span className="text-yellow-400">
            Ghana Startup Association
          </span>{" "}
          community
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
          Fostering innovation and growth through transparent, accountable initiatives that empower Ghana's next generation of entrepreneurs.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Now
            </button>
          </Link>
          <button className="border-2 border-white/80 text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
            Get in Touch 
            <ArrowUpRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
