import React from 'react';
import SectionCard from './SectionCard';

const ResourcePageEditor = ({ onNavigate }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Resource Page</h3>
    <div className="space-y-6">
      <SectionCard title="Video" onAdd={() => onNavigate('Video')} />
      <SectionCard title="Resource" onAdd={() => onNavigate('ResourceSub')} />
    </div>
  </div>
);

export default ResourcePageEditor;