import React from 'react';

const SectionCard = ({ title, onAdd }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
    <h3 className="text-lg font-semibold">{title}</h3>
    <button
      className="text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      onClick={onAdd}
    >
      +
    </button>
  </div>
);

export default SectionCard;