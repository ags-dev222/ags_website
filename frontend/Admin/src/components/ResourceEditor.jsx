import React, { useState, useEffect } from 'react';

const ResourceEditor = ({ initialResource = {}, onSave, onClose }) => {
  const [generalTitle, setGeneralTitle] = useState(initialResource.generalTitle || '');
  const [uploadType, setUploadType] = useState(initialResource.uploadType || 'Single Document Upload');
  const [category, setCategory] = useState(initialResource.category || '');
  const [pageType, setPageType] = useState(initialResource.pageType || 'Home page and resource page');
  const [title1, setTitle1] = useState(initialResource.documents?.[0]?.title || '');
  const [file1, setFile1] = useState(initialResource.documents?.[0]?.file || null);
  const [title2, setTitle2] = useState(initialResource.documents?.[1]?.title || '');
  const [file2, setFile2] = useState(initialResource.documents?.[1]?.file || null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode with page theme on mount
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme);
  }, []);

  const handleFileUpload1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile1(e.target.files[0]);
    }
  };

  const handleFileUpload2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile2(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const data = {
      generalTitle,
      uploadType,
      category,
      pageType,
      documents:
        uploadType === 'Single Document Upload'
          ? [{ title: title1, file: file1 }]
          : [
              { title: title1, file: file1 },
              { title: title2, file: file2 },
            ],
    };
    onSave(data);
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
        <button
          className={`absolute top-3 right-3 text-xl ${
            isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Resource Upload</h3>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              General Title
            </label>
            <input
              type="text"
              value={generalTitle}
              onChange={(e) => setGeneralTitle(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
              placeholder="Enter general title"
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Upload Type
            </label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
            >
              <option value="Single Document Upload">Single Document Upload</option>
              <option value="Double Document Upload">Double Document Upload</option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
            >
              <option value="">Select a category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Page Type
            </label>
            <select
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
            >
              <option value="Home page and resource page">Home page and resource page</option>
              <option value="Home page only">Home page only</option>
              <option value="Resource page only">Resource page only</option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Title 1
            </label>
            <input
              type="text"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
              placeholder="Enter title 1"
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              File 1
            </label>
            <input
              type="file"
              onChange={handleFileUpload1}
              className={`mt-1 block w-full p-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-black'
              }`}
            />
            {file1 && (
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {file1.name}
              </p>
            )}
          </div>
          {uploadType === 'Double Document Upload' && (
            <>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Title 2
                </label>
                <input
                  type="text"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                  className={`mt-1 block w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-black'
                  }`}
                  placeholder="Enter title 2"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  File 2
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload2}
                  className={`mt-1 block w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-black'
                  }`}
                />
                {file2 && (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {file2.name}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-4 mt-6">
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
            className={`flex-1 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
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

export default ResourceEditor;