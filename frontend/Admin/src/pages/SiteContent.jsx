import React, { useState, useEffect } from 'react';
import HeroSectionEditor from '../components/HeroSectionEditor';
import ManifestoEditor from '../components/ManifestoEditor';
import ResourceEditor from '../components/ResourceEditor';
import VideoEditor from '../components/VideoEditor';
import StatisticsEditor from '../components/StatisticsEditor';
import TestimoniesEditor from '../components/TestimoniesEditor';
import TopPartnersEditor from '../components/TopPartnersEditor';
import ResourcePageEditor from '../components/ResourcePageEditor';
import OurTeamEditor from '../components/OurTeamEditor';
import MissionVisionEditor from '../components/MissionVisionEditor';
import SuccessStoriesEditor from '../components/SuccessStoriesEditor';
import SectionCard from '../components/SectionCard';

// renderContentArea function
const renderContentArea = ({
  subPage,
  updateSubPage,
  siteData,
  setSiteData,
  isDarkMode,
}) => {
  // State for ResourceEditor modal in Homepage
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const containerClasses = `w-full ${
    isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
  }`;

  const backButtonClasses = `flex items-center ${
    isDarkMode
      ? 'text-gray-300 hover:text-red-400'
      : 'text-gray-500 hover:text-red-500'
  }`;

  if (subPage === 'HeroSection') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Homepage')}
            aria-label="Back to Homepage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <HeroSectionEditor
          initialData={siteData.heroSection}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, heroSection: data }))
          }
          onClose={() => updateSubPage('Homepage')}
        />
      </div>
    );
  }

  if (subPage === 'Manifesto') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Homepage')}
            aria-label="Back to Homepage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <ManifestoEditor
          initialData={siteData.manifesto}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, manifesto: data }))
          }
          onClose={() => updateSubPage('Homepage')}
        />
      </div>
    );
  }

  if (subPage === 'TopPartners') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Homepage')}
            aria-label="Back to Homepage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <TopPartnersEditor
          initialLogos={siteData.topPartners}
          onSave={(logos) =>
            setSiteData((prev) => ({ ...prev, topPartners: logos }))
          }
          onClose={() => updateSubPage('Homepage')}
        />
      </div>
    );
  }

  if (subPage === 'Video') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Resource Page')}
            aria-label="Back to Resource Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <VideoEditor
          initialData={siteData.video}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, video: data }))
          }
          onClose={() => updateSubPage('Resource Page')}
        />
      </div>
    );
  }

  if (subPage === 'Statistics') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Homepage')}
            aria-label="Back to Homepage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <StatisticsEditor
          initialData={siteData.statistics}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, statistics: data }))
          }
          onClose={() => updateSubPage('Homepage')}
        />
      </div>
    );
  }

  if (subPage === 'Testimonies') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('Homepage')}
            aria-label="Back to Homepage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <TestimoniesEditor
          initialData={siteData.testimonies}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, testimonies: data }))
          }
          onClose={() => updateSubPage('Homepage')}
        />
      </div>
    );
  }

  if (subPage === 'OurTeam') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('About page')}
            aria-label="Back to About page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <OurTeamEditor
          initialData={siteData.ourTeam}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, ourTeam: data }))
          }
          onClose={() => updateSubPage('About page')}
        />
      </div>
    );
  }

  if (subPage === 'MissionVision') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('About page')}
            aria-label="Back to About page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <MissionVisionEditor
          initialData={siteData.missionVision}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, missionVision: data }))
          }
          onClose={() => updateSubPage('About page')}
        />
      </div>
    );
  }

  if (subPage === 'SuccessStories') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage('About page')}
            aria-label="Back to About page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <SuccessStoriesEditor
          initialData={siteData.successStories}
          onSave={(data) =>
            setSiteData((prev) => ({ ...prev, successStories: data }))
          }
          onClose={() => updateSubPage('About page')}
        />
      </div>
    );
  }

  if (subPage === 'Homepage') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage(null)}
            aria-label="Back to Sites Content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <div className="space-y-6">
          <SectionCard
            title="Hero Section"
            onAdd={() => updateSubPage('HeroSection')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Manifesto"
            onAdd={() => updateSubPage('Manifesto')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Top Partners"
            onAdd={() => updateSubPage('TopPartners')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Resource"
            onAdd={() => setIsResourceModalOpen(true)}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Statistics"
            onAdd={() => updateSubPage('Statistics')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Testimonies"
            onAdd={() => updateSubPage('Testimonies')}
            isDarkMode={isDarkMode}
          />
        </div>
        {isResourceModalOpen && (
          <ResourceEditor
            onSave={(data) => {
              setSiteData((prev) => ({
                ...prev,
                resources: [...prev.resources, data],
              }));
              setIsResourceModalOpen(false);
            }}
            onClose={() => setIsResourceModalOpen(false)}
          />
        )}
      </div>
    );
  }

  if (subPage === 'Resource Page') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage(null)}
            aria-label="Back to Sites Content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <ResourcePageEditor
          onNavigate={(page) => updateSubPage(page)}
        />
      </div>
    );
  }

  if (subPage === 'About page') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center mb-4">
          <button
            className={backButtonClasses}
            onClick={() => updateSubPage(null)}
            aria-label="Back to Sites Content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>
        <div className="space-y-6">
          <SectionCard
            title="Our Team"
            onAdd={() => updateSubPage('OurTeam')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Mission and Vision"
            onAdd={() => updateSubPage('MissionVision')}
            isDarkMode={isDarkMode}
          />
          <SectionCard
            title="Success Stories"
            onAdd={() => updateSubPage('SuccessStories')}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    );
  }

  // Bar with Homepage, Resource Page, About page
  return (
    <div className={containerClasses}>
      <div className="space-y-6">
        <SectionCard
          title="Home page"
          onAdd={() => updateSubPage('Homepage')}
          isDarkMode={isDarkMode}
        />
        <SectionCard
          title="Resource Page"
          onAdd={() => updateSubPage('Resource Page')}
          isDarkMode={isDarkMode}
        />
        <SectionCard
          title="About page"
          onAdd={() => updateSubPage('About page')}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

// SiteContent component
const SiteContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Sites Content');
  const [subPage, setSubPage] = useState(null);

  // Sync dark mode with page theme and observe changes
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.classList.contains('dark');
      setIsDarkMode(theme);
    };
    updateTheme(); // Initial check
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const [siteData, setSiteData] = useState({
    heroSection: { image: null, title: '', subtitle: '' },
    manifesto: { image: null, title: '', description: '' },
    topPartners: [],
    resources: [],
    video: { videoFile: null, videoTitle: '', videoLink: '' },
    statistics: { image: null, title: '', description: '' },
    testimonies: { image: null, title: '', description: '' },
    ourTeam: { image: null, title: '', description: '' },
    missionVision: { image: null, title: '', description: '' },
    successStories: { image: null, title: '', description: '' },
  });

  const updateSubPage = (page) => {
    setSubPage(page);
    setActiveTab(page || 'Sites Content');
  };

  return (
    <div
      className={`flex-1 p-10 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6">{activeTab}</h2>
      {renderContentArea({ subPage, updateSubPage, siteData, setSiteData, isDarkMode })}
    </div>
  );
};

export default SiteContent;