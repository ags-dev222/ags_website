import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SuccessStoriesEditor = ({ initialData = {}, onSave, onClose }) => {
  const [image, setImage] = useState(initialData.image || null);
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with page theme on mount
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme);
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClear = () => {
    setImage(null);
    setTitle('');
    setDescription('');
    onSave({ image: null, title: '', description: '' });
  };

  const handleSave = () => {
    onSave({ image, title, description });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
        isDarkMode ? 'bg-black/40' : 'bg-white/30'
      }`}
    >
      <div
        className={`relative rounded-xl shadow-lg w-full max-w-lg p-6 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        {/* Close Button */}
        <button
          className={`absolute top-4 right-4 ${
            isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-6 text-center">Success Stories</h3>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-32 h-32 mx-auto object-cover rounded-full"
              />
            ) : (
              <div className="flex flex-col items-center">
                <span className={`text-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  +
                </span>
                <span
                  className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  Upload Image (Optional)
                </span>
              </div>
            )}
          </label>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label
            className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            placeholder="Enter success stories title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            placeholder="Enter success stories description"
            rows="5"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
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
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-red-600 hover:bg-red-700'
            }`}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesEditor;