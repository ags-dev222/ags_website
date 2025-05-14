import React, { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ResourceEditor from './ResourceEditor';

const ResourceSub = () => {
  const { darkMode } = useContext(ThemeContext);
  const [resources, setResources] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const handleAddResource = () => {
    setEditingResource({});
    setIsEditorOpen(true);
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setIsEditorOpen(true);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  const handleSaveResource = (data) => {
    const newResource = {
      ...data,
      id: editingResource && editingResource.id ? editingResource.id : resources.length + 1,
      type: data.uploadType === 'Video Upload' ? 'video' : 'document',
    };
    if (editingResource && editingResource.id) {
      setResources(
        resources.map((r) => (r.id === editingResource.id ? newResource : r))
      );
    } else {
      setResources([...resources, newResource]);
    }
    setIsEditorOpen(false);
    setEditingResource(null);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingResource(null);
  };

  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Resources (Video & Documents)</h2>
        <button
          onClick={handleAddResource}
          className={`px-4 py-2 rounded-lg ${
            darkMode
              ? 'bg-green-700 text-white hover:bg-green-800'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Add Resource
        </button>
      </div>
      <div className="space-y-4">
        {resources.length === 0 ? (
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            No resources available.
          </p>
        ) : (
          resources.map((resource) => (
            <div
              key={resource.id}
              className={`p-4 border rounded-lg ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{resource.generalTitle}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Type: {resource.type === 'video' ? 'Video' : 'Document'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Category: {resource.category || 'None'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Page Type: {resource.pageType}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {resource.type === 'video'
                      ? `Video: ${resource.documents[0]?.title}`
                      : `Documents: ${resource.documents.map((doc) => doc.title).join(', ')}`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditResource(resource)}
                    className={`text-sm ${
                      darkMode
                        ? 'text-green-400 hover:text-green-500'
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className={`text-sm ${
                      darkMode
                        ? 'text-red-400 hover:text-red-500'
                        : 'text-red-500 hover:text-red-600'
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isEditorOpen && (
        <ResourceEditor
          initialResource={editingResource || {}}
          onSave={handleSaveResource}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default ResourceSub;