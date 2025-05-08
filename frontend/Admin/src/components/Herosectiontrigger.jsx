import React, { useState } from 'react';
import HeroSectionEditor from './HeroSectionEditor';

const HeroSectionTrigger = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleSave = (data) => {
    console.log('Saved hero section data:', data);
  };

  return (
    <div>
      <div
        onClick={() => setIsEditorOpen(true)}
        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer"
      >
        <span className="text-4xl">+</span>
      </div>

      {isEditorOpen && (
        <HeroSectionEditor
          onSave={handleSave}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
};

export default HeroSectionTrigger;
