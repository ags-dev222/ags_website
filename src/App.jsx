import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ActivitiesPage from './components/ActivitiesPage';
import RegisterForm from './components/JoinNow';
import EcosystemAGS from './components/EcosystemAGS';
import ForgotPassword from './components/ForgotPassword';
import SuccessStories from './components/SuccessStories';
import AboutTeam from './components/AboutTeam';
import AboutMissionVission from './components/AboutMissionVission';
import Resources from './components/Resources';
import EventsSection from './components/EventsSection';
import NewsSection from './components/NewsSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/ecosystem" element={<EcosystemAGS />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/about-team" element={<AboutTeam />} />
          <Route path="/about-mission-vission" element={<AboutMissionVission />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog1" element={<NewsSection />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;