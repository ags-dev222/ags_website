import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';

const ResourcePageEditor = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with page theme on mount
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme);
  }, []);

  return (
    <div
      className={`rounded-lg shadow p-6 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Resource Page</h3>
      <div className="space-y-6">
        <SectionCard title="Video" onAdd={() => onNavigate('Video')} />
        <SectionCard title="Resource" onAdd={() => onNavigate('ResourceSub')} />
      </div>
    </div>
  );
};

export default ResourcePageEditor;