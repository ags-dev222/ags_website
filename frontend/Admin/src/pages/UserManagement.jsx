/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

function UserManagement() {
  const [activeTab, setActiveTab] = useState('User Management');
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [subPage, setSubPage] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Solomon',
      lastName: 'Adjei',
      email: 'corporate@ags.com',
      role: 'Admin',
      password: '************',
      dateAdded: '02/02/2024',
    },
  ]);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleAddUser = () => {
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newId = maxId + 1;
    const newUser = {
      id: newId,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateAdded: new Date().toLocaleDateString('en-GB'),
      role: 'Staff',
    };
    setUsers([newUser, ...users]);
  };

  const handleUserChange = (id, field, value) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)));
  };

  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((user) => user.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="flex-1 p-10">
      <div
        className={`p-6 rounded-lg ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">{activeTab}</h2>
        <UserTable
          users={users}
          handleUserChange={handleUserChange}
          togglePasswordVisibility={togglePasswordVisibility}
          passwordVisibility={passwordVisibility}
          handleAddUser={handleAddUser}
          setShowDeleteConfirm={setShowDeleteConfirm}
          darkMode={darkMode}
        />
        {showDeleteConfirm && (
          <DeleteConfirmationModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default UserManagement;