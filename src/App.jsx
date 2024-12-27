import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ManifestoSection from "./components/ManifestoSection";
import DiscussionSection from "./components/DiscussionSection";
import EventsSection from "./components/EventsSection"; // Import EventsSection
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar /> {/* Top Navigation Bar */}
      <HeroSection /> {/* Main Hero Section */}
      <ManifestoSection /> {/* Manifesto Section */}
      <DiscussionSection /> {/* Discussion Section */}
      <EventsSection /> {/* Events Section */}
      <Footer /> {/* Footer Section */}
    </div>
  );
};

export default App;
