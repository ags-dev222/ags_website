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
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content on Top of Carousel */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Title Text */}
        <h6 className="text-4xl md:text-5xl font-bold mb-6">
          Are you part of the dynamic{" "}
          <span className="text-yellow-400">
            Ghana <br />
            Startup Association
          </span>{" "}
          Community?
        </h6>
        <p className="mb-6">
          Join us in fostering innovation and growth through transparent and
          accountable initiatives
        </p>

        {/* Call to Action Buttons */}
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-1 rounded-lg text-lg font-medium">
              Join now
            </button>
          </Link>
          <button className="border-2 border-white text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition flex items-center">
            Get in Touch <ArrowUpRightIcon className="ml-1 h-7 w-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
