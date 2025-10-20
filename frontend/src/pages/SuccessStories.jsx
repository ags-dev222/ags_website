import SuccessDiscussion from "../components/SuccessDiscussion";
import SuccessRecognitionSection from "../components/SuccessRecognitionSection";
import Navbar from "../components/Navbar";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen mx-auto flex flex-col md:flex-row mt-15"
      style={{
        backgroundImage: "url('./images/man.jpeg')", // Replace with your image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-100 opacity-0"></div>

      {/* Content */}
      <div className="relative z-10 ml-24 flex flex-col items-start justify-center h-full text-left text-black px-4">
        {/* Title Text */}
        <h6 className="text-4xl flex flex-col md:flex-row md:text-5xl font-bold mb-6">
          Our Impact & <br /> Success Stories
        </h6>
        <p className="mb-6">
          Explore the remarkable journey of AGS and Ghana Startup Week. <br />
          Discover how we have empowered entrepreneurs, fostered <br />
          innovation, and transformed the startup ecosystem in Ghana.
        </p>
      </div>
    </div>
  );
};


function SuccessStories() {
  return (
    <div className="bg-gray-100 text-gray-800">
{/* <h1 className="text-4xl font-bold text-center py-2">Success Stories</h1> */}
      <Navbar theme="dark" />
      <HeroSection />
      <SuccessDiscussion />
      <SuccessRecognitionSection/>
    </div>
  );
} 

export default SuccessStories;
