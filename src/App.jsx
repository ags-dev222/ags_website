import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import PartneringSection from './components/PartneringSection';
import LookupSection from './components/LookupSection';
import StatisticsQuoteSection from './components/StatisticsQuoteSection';
import EventRecognitionSection from './components/EventRecognitionSection';
import LoginPage from './components/LoginPage';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import EventPage from './components/EventPage';

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && location.pathname !== '/events' && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/" element={
          <>
            <Navbar />
            <HeroSection />
            <ManifestoSection />
            <PartneringSection />
            <LookupSection />
            <StatisticsQuoteSection />
            <EventRecognitionSection />
            <ContactForm />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
