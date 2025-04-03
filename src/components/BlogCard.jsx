import React, { useState, useEffect } from 'react';

const BlogCard = ({ blog, onDelete, onEdit }) => {
  const { id, mainImage, title, description, additionalImages } = blog;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedMainImage, setEditedMainImage] = useState(mainImage);
  const [editedAdditionalImage1, setEditedAdditionalImage1] = useState(additionalImages?.[0] || null);
  const [editedAdditionalImage2, setEditedAdditionalImage2] = useState(additionalImages?.[1] || null);

  useEffect(() => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedMainImage(mainImage);
    setEditedAdditionalImage1(additionalImages?.[0] || null);
    setEditedAdditionalImage2(additionalImages?.[1] || null);
  }, [title, description, mainImage, additionalImages]);

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
        <img src={mainImage} alt={title} className="w-full h-full object-cover" />
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
                className="flex items-center block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  setDropdownOpen(false);
                  setEditModalOpen(true);
                }}
              >
                Edit Blog
              </button>
              <button
                className="flex items-center block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
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
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm">{description}</p>
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
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Main Image</label>
              {editedMainImage && (
                <img src={editedMainImage} alt="Main Image" className="w-full h-40 object-cover rounded mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedMainImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Additional Image 1</label>
              {editedAdditionalImage1 && (
                <img src={editedAdditionalImage1} alt="Additional Image 1" className="w-full h-40 object-cover rounded mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedAdditionalImage1(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Additional Image 2</label>
              {editedAdditionalImage2 && (
                <img src={editedAdditionalImage2} alt="Additional Image 2" className="w-full h-40 object-cover rounded mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedAdditionalImage2(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
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