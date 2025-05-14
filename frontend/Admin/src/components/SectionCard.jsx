import React from 'react';

const SectionCard = ({ title, onAdd, isDarkMode }) => (
  <div
    className={`rounded-lg shadow-sm p-6 flex items-center justify-between ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
    }`}
  >
    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {title}
    </h3>
    <button
      className={`text-2xl ${
        isDarkMode
          ? 'text-gray-300 hover:text-gray-100'
          : 'text-gray-400 hover:text-gray-600'
      }`}
      onClick={onAdd}
      aria-label={`Add ${title} section`}
    >
      +
    </button>
  </div>
);

export default SectionCard;