import React, { useState, useEffect } from 'react';

const VideoEditor = ({ initialData = {}, onSave, onClose }) => {
  const [videoFile, setVideoFile] = useState(initialData.videoFile || null);
  const [videoTitle, setVideoTitle] = useState(initialData.videoTitle || '');
  const [videoLink, setVideoLink] = useState(initialData.videoLink || '');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDarkMode(dark);
  }, []);

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setVideoFile(null);
    setVideoTitle('');
    setVideoLink('');
    onSave({ videoFile: null, videoTitle: '', videoLink: '' });
    onClose();
  };

  const handleSave = () => {
    onSave({ videoFile, videoTitle, videoLink });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
        isDarkMode ? 'bg-black/40' : 'bg-white/30'
      }`}
    >
      <div
        className={`relative w-full max-w-xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 text-xl ${
            isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Video Upload</h3>

        {/* Video File Input */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Video File
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
          />
          {videoFile && (
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{videoFile.name}</p>
          )}
        </div>

        {/* Video Title Input */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Video Title
          </label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            placeholder="Enter video title"
          />
        </div>

        {/* Video Link Input */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Video Link
          </label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            placeholder="Enter video link"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSave}
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className={`flex-1 py-2 rounded-lg text-white ${
              isDarkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
