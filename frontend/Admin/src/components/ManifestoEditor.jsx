import React, { useState, useEffect } from 'react';

const ManifestoEditor = ({ initialData = {}, onSave, onClose }) => {
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 ${
        isDarkMode ? 'bg-black/40' : 'bg-white/30'
      }`}
    >
      <div
        className={`relative rounded-lg shadow-lg w-full max-w-lg p-6 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <button
          className={`absolute top-3 right-3 text-xl ${
            isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Manifesto</h3>
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
                className="w-32 h-32 mx-auto object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center">
                <span
                  className={`text-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
                >
                  +
                </span>
                <span
                  className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
                >
                  Upload Image (Optional)
                </span>
              </div>
            )}
          </label>
        </div>
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
            placeholder="Enter manifesto title"
          />
        </div>
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
            placeholder="Enter manifesto description"
            rows="5"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={() => {
              onSave({ image, title, description });
              onClose();
            }}
          >
            Save
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
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

export default ManifestoEditor;