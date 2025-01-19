import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartneringSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    centerMode: true,
    centerPadding: '60px', // Adjust the padding as needed
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  return (
    <div className="py-10 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Top Partnering <br /> Companies and Institutions
        </h2>
        <p className="text-gray-600">
          We have top collaboration with prestige companies in the world.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
          <div className="h-24 w-24 bg-gray-300 rounded mx-4"></div>
        </Slider>
      </div>
    </div>
  );
};

export default PartneringSection;
