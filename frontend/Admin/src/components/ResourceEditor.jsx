import React, { useState } from 'react';

const ResourceEditor = ({ initialResource = {}, onSave, onClose, darkMode }) => {
  const [generalTitle, setGeneralTitle] = useState(initialResource.generalTitle || '');
  const [uploadType, setUploadType] = useState(initialResource.uploadType || 'Single Document Upload');
  const [category, setCategory] = useState(initialResource.category || '');
  const [pageType, setPageType] = useState(initialResource.pageType || 'Home page and resource page');
  const [title1, setTitle1] = useState(initialResource.documents?.[0]?.title || '');
  const [file1, setFile1] = useState(initialResource.documents?.[0]?.file || null);
  const [title2, setTitle2] = useState(initialResource.documents?.[1]?.title || '');
  const [file2, setFile2] = useState(initialResource.documents?.[1]?.file || null);

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
      documents: uploadType === 'Single Document Upload'
        ? [{ title: title1, file: file1 }]
        : [{ title: title1, file: file1 }, { title: title2, file: file2 }],
    };
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] text-black dark:text-white">
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Resource Upload</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">General Title</label>
            <input
              type="text"
              value={generalTitle}
              onChange={(e) => setGeneralTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder="Enter general title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Type</label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="Single Document Upload">Single Document Upload</option>
              <option value="Double Document Upload">Double Document Upload</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="">Select a category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Type</label>
            <select
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="Home page and resource page">Home page and resource page</option>
              <option value="Home page only">Home page only</option>
              <option value="Resource page only">Resource page only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title 1</label>
            <input
              type="text"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
              placeholder="Enter title 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File 1</label>
            <input
              type="file"
              onChange={handleFileUpload1}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            {file1 && <p className="text-sm text-gray-500 dark:text-gray-400">{file1.name}</p>}
          </div>
          {uploadType === 'Double Document Upload' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title 2</label>
                <input
                  type="text"
                  value={title2}
                  onChange={(e) => setTitle2(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Enter title 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File 2</label>
                <input
                  type="file"
                  onChange={handleFileUpload2}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                {file2 && <p className="text-sm text-gray-500 dark:text-gray-400">{file2.name}</p>}
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
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