import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import ManifestoSection from "../Components/ManifestoSection";
import TopPartneringSection from "../Components/TopPartneringSection";
import AccordionLookup from "../Components/AccordionLookup";
import ContactForm from "../Components/ContactForm";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Manifesto Section */}
      <ManifestoSection />

      {/* Top Partnering Section */}
      <TopPartneringSection />

      {/* Lookup Accordion */}
      <AccordionLookup />

      {/* Contact Form */}
       <ContactForm />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
