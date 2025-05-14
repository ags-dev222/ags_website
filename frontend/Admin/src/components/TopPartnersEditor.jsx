import React, { useState, useEffect } from 'react';

const TopPartnersEditor = ({ initialLogos = [], onSave, onClose }) => {
  const [logos, setLogos] = useState(initialLogos);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with page theme on mount
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme);
  }, []);

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newLogo = {
        id: Date.now(),
        src: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
        isDarkMode ? 'bg-black/40' : 'bg-white/30'
      }`}
    >
      <div
        className={`relative rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        {/* Close Button */}
        <button
          className={`absolute top-3 right-3 text-xl ${
            isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">Top Partners</h3>

        {/* Upload Area */}
        <div className="mb-6">
          <label
            className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <div className="flex flex-col items-center">
              <span
                className={`text-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
              >
                +
              </span>
              <span
                className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
              >
                Drop your image HERE or{' '}
                <span
                  className={`underline ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  Click to Browse
                </span>
              </span>
            </div>
          </label>
        </div>

        {/* Logo Preview */}
        <div
          className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <p
            className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-2`}
          >
            Note: You can rearrange these logos by dragging each one.
          </p>
          <div className="flex flex-wrap gap-4">
            {logos.map((logo) => (
              <div key={logo.id} className="relative">
                <img
                  src={logo.src}
                  alt="Partner Logo"
                  className={`h-16 w-16 object-contain border rounded ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}
                />
                <button
                  className={`absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white ${
                    isDarkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
                  }`}
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
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
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