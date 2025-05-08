import React, { useState } from 'react';

const TopPartnersEditor = ({ initialLogos = [], onSave, onClose }) => {
  const [logos, setLogos] = useState(initialLogos);

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newLogo = {
        id: Date.now(),
        src: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0], // Store the file itself if needed for upload
      };
      setLogos([...logos, newLogo]);
    }
  };

  const handleDeleteLogo = (id) => {
    setLogos(logos.filter((logo) => logo.id !== id));
  };

  const handleSave = () => {
    onSave(logos);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Top Partners</h3>

        {/* Upload Area */}
        <div className="mb-6">
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer dark:border-gray-600">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <div className="flex flex-col items-center">
              <span className="text-3xl text-gray-400 dark:text-gray-500">+</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Drop your image HERE or{' '}
                <span className="text-blue-500 underline">Click to Browse</span>
              </span>
            </div>
          </label>
        </div>

        {/* Logo Preview */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Note: You can rearrange these logos by dragging each one.
          </p>
          <div className="flex flex-wrap gap-4">
            {logos.map((logo) => (
              <div key={logo.id} className="relative">
                <img
                  src={logo.src}
                  alt="Partner Logo"
                  className="h-16 w-16 object-contain border border-gray-300 dark:border-gray-600 rounded"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => handleDeleteLogo(logo.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            onClick={handleSave}
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
    </div>
  );
};

export default TopPartnersEditor;
// This component allows users to upload and manage logos for a "Top Partners" section. It includes a file input for uploading images, a preview of uploaded logos, and buttons to save or cancel changes. The component uses local state to manage the list of logos and provides a callback function to save the logos when the user clicks the "Save" button.
// The logos are displayed with a delete button to remove individual logos, and the component is styled using Tailwind CSS classes for a clean and modern look.