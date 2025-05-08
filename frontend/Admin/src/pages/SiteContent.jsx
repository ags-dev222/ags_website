import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
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
  darkMode,
}) => {
  // State for ResourceEditor modal in Homepage
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  if (subPage === 'HeroSection') {
    return (
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Homepage')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Homepage')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Homepage')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Resource Page')}
          >
 थी <svg
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Homepage')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('Homepage')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('About page')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('About page')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage('About page')}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage(null)}
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
            darkMode={darkMode}
          />
          <SectionCard
            title="Manifesto"
            onAdd={() => updateSubPage('Manifesto')}
            darkMode={darkMode}
          />
          <SectionCard
            title="Top Partners"
            onAdd={() => updateSubPage('TopPartners')}
            darkMode={darkMode}
          />
          <SectionCard
            title="Resource"
            onAdd={() => setIsResourceModalOpen(true)}
            darkMode={darkMode}
          />
          <SectionCard
            title="Statistics"
            onAdd={() => updateSubPage('Statistics')}
            darkMode={darkMode}
          />
          <SectionCard
            title="Testimonies"
            onAdd={() => updateSubPage('Testimonies')}
            darkMode={darkMode}
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
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage(null)}
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
          darkMode={darkMode}
        />
      </div>
    );
  }

  if (subPage === 'About page') {
    return (
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={() => updateSubPage(null)}
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
            darkMode={darkMode}
          />
          <SectionCard
            title="Mission and Vision"
            onAdd={() => updateSubPage('MissionVision')}
            darkMode={darkMode}
          />
          <SectionCard
            title="Success Stories"
            onAdd={() => updateSubPage('SuccessStories')}
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="space-y-6">
        <SectionCard
          title="Home page"
          onAdd={() => updateSubPage('Homepage')}
          darkMode={darkMode}
        />
        <SectionCard
          title="Resource Page"
          onAdd={() => updateSubPage('Resource Page')}
          darkMode={darkMode}
        />
        <SectionCard
          title="About page"
          onAdd={() => updateSubPage('About page')}
          darkMode={darkMode}
        />
      </div>
    </div>
    );
};

// SiteContent component
const SiteContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('Sites Content');
  const [subPage, setSubPage] = useState(null);

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
    <div className="flex-1 p-10 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-semibold mb-6">{activeTab}</h2>
      {renderContentArea({ subPage, updateSubPage, siteData, setSiteData, darkMode })}
    </div>
  );
};

export default SiteContent;
