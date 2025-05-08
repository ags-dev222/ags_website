import React, { useState } from 'react';

const HeroSectionEditor = ({ initialData = {}, onSave, onClose, darkMode }) => {
  const [image, setImage] = useState(initialData.image || null);
  const [title, setTitle] = useState(initialData.title || '');
  const [subtitle, setSubtitle] = useState(initialData.subtitle || '');

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClear = () => {
    setImage(null);
    setTitle('');
    setSubtitle('');
    onSave({ image: null, title: '', subtitle: '' });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-md relative text-black dark:text-white">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <div className="mb-4">
          <label className="block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {image ? (
              <img src={image} alt="Uploaded" className="w-32 h-32 mx-auto object-cover" />
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-3xl text-gray-400 dark:text-gray-500">+</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">Upload Photo</span>
              </div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter subtitle"
            rows="3"
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
            onClick={() => {
              onSave({ image, title, subtitle });
              onClose();
            }}
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

export default HeroSectionEditor;