import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ActivitiesPage from './pages/EventsSection';
import RegisterForm from './pages/JoinNow';
import EventRegistration from './components/EventRegistration';
import EcosystemAGS from './pages/EcosystemAGS';
import ForgotPassword from './components/ForgotPassword';
import SuccessStories from './pages/SuccessStories';
import AboutTeam from './pages/AboutTeam';
import AboutMissionVission from './pages/AboutMissionVission';
import Resources from './pages/Resources';
import EventsSection from './components/ActivitiesPage';
import NewsSection from './pages/NewsSection';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/registerevent" element={<EventRegistration />} />
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