import HeroSection from './HeroSection';
import ManifestoSection from './ManifestoSection';
import PartneringSection from './PartneringSection';
import LookupSection from './LookupSection';
import StatisticsQuoteSection from './StatisticsQuoteSection';
import EventRecognitionSection from './EventRecognitionSection';
import ContactForm from './ContactForm';

const HomePage = () => {
  return (
    <div>
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