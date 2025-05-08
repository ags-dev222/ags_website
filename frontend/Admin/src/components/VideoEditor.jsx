import React, { useState } from 'react';

const VideoEditor = ({ initialData = {}, onSave, onClose, darkMode }) => {
  const [videoFile, setVideoFile] = useState(initialData.videoFile || null);
  const [videoTitle, setVideoTitle] = useState(initialData.videoTitle || '');
  const [videoLink, setVideoLink] = useState(initialData.videoLink || '');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-6 overflow-y-auto max-h-[90vh] text-black dark:text-white">
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Video</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          {videoFile && <p className="text-sm text-gray-500 dark:text-gray-400">{videoFile.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter video title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video Link</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter video link"
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;