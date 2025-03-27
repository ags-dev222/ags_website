import React, { useState, useEffect } from 'react';

const BlogCard = ({ blog, onDelete, onEdit }) => {
  // Initialize state at the top
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedMainImage, setEditedMainImage] = useState('');
  const [editedAdditionalImage1, setEditedAdditionalImage1] = useState(null);
  const [editedAdditionalImage2, setEditedAdditionalImage2] = useState(null);

  useEffect(() => {
    if (blog) {
      setEditedTitle(blog.title || '');
      setEditedDescription(blog.description || '');
      setEditedMainImage(blog.mainImage || '');
      setEditedAdditionalImage1(blog.additionalImages?.[0] || null);
      setEditedAdditionalImage2(blog.additionalImages?.[1] || null);
    }
  }, [blog]);

  // If blog is undefined, return null AFTER initializing hooks
  if (!blog) return null;

  // eslint-disable-next-line no-unused-vars
  const { id, mainImage, title, description, additionalImages } = blog;

  const handleSave = () => {
    onEdit(id, {
      title: editedTitle,
      description: editedDescription,
      mainImage: editedMainImage,
      additionalImages: [editedAdditionalImage1, editedAdditionalImage2].filter(Boolean),
    });
    setEditModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="relative h-40">
        <img src={mainImage || ''} alt={title || 'No Title'} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            •••
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow z-10">
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  setDropdownOpen(false);
                  setEditModalOpen(true);
                }}
              >
                Edit Blog
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  setDropdownOpen(false);
                  setDeleteModalOpen(true);
                }}
              >
                Delete Blog
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title || 'No Title'}</h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm">{description || 'No Description Available'}</p>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Edit Blog</h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Delete Blog?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This action will permanently delete the blog, making it inaccessible on the CITSA website. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  onDelete(id);
                  setDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
