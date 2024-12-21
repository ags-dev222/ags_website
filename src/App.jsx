import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ManifestoSection from "./components/ManifestoSection";
import PartneringSection from "./components/PartneringSection";
import LookupSection from "./components/LookupSection";
import StatisticsQuoteSection from "./components/StatisticsQuoteSection";
import EventRecognitionSection from "./components/EventRecognitionSection";
import ContactForm from "./components/ContactForm"; // Import ContactForm
import Footer from "./components/Footer"; // Import Footer

const App = () => {
  return (
    <div>
      <Navbar /> {/* Top Navigation Bar */}
      <HeroSection /> {/* Main Hero Section */}
      <ManifestoSection /> {/* Manifesto Section */}
      <PartneringSection /> {/* Partnering Section */}
      <LookupSection /> {/* Lookup Section */}
      <StatisticsQuoteSection /> {/* Statistics and Quote Section */}
      <EventRecognitionSection /> {/* Event Recognition Section */}
      <ContactForm /> {/* Contact Form Section */}
      <Footer /> {/* Footer Section */}
    </div>
  );
};

export default App;
