import React, { useState } from 'react';

const TopPartnersEditor = ({ initialLogos = [], onSave, onClose }) => {
  const [logos, setLogos] = useState(initialLogos);

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newLogo = { id: Date.now(), src: URL.createObjectURL(e.target.files[0]) };
      setLogos([...logos, newLogo]);
    }
  };

  const handleDeleteLogo = (id) => {
    setLogos(logos.filter((logo) => logo.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Top Partners</h3>
      <div className="mb-6">
        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <div className="flex flex-col items-center">
            <span className="text-3xl text-gray-400">+</span>
            <span className="text-sm text-gray-400">
              Drop your image HERE or select{' '}
              <span className="text-blue-500">Click to Browse</span>
            </span>
          </div>
        </label>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
          Note: You can simply rearrange these logos by dragging each logo over
        </p>
        <div className="flex space-x-4">
          {logos.map((logo) => (
            <div key={logo.id} className="relative">
              <img src={logo.src} alt="Partner Logo" className="h-16 w-16 object-contain" />
              <button
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleDeleteLogo(logo.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          onClick={() => {
            onSave(logos);
            onClose();
          }}
        >
          Save
        </button>
        <button
          className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TopPartnersEditor;