import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection"; // Import NewsSection
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <NewsSection /> {/* Add News Section */}
      <Footer />
    </div>
  );
};

export default App;
