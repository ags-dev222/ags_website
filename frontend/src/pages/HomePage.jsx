import HeroSection from '../components/HeroSection';
import ManifestoSection from '../components/ManifestoSection';
import PartneringSection from '../components/PartneringSection';
import LookupSection from '../components/LookupSection';
import StatisticsQuoteSection from '../components/StatisticsQuoteSection';
import EventRecognitionSection from '../components/EventRecognitionSection';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <PartneringSection />
      <LookupSection />
      <StatisticsQuoteSection />
      <EventRecognitionSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;