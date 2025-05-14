import React from 'react';

const DeleteConfirmationModal = ({ onConfirm, onCancel, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/5 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`rounded-lg p-6 w-96 shadow-lg transform transition-all scale-100 hover:scale-105 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <h3
          className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          } mb-4`}
        >
          Confirm Deletion
        </h3>
        <p
          className={`mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
