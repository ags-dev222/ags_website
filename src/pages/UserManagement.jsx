import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar'; // ✅ Use Topbar from Admin_project
import UserTable from '../components/UserTable';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { ThemeContext } from '../context/ThemeContext'; // ✅ Import ThemeContext
import { useContext } from 'react';

function UserManagement() {
  const [activeTab, setActiveTab] = useState('User Management');
  const { darkMode, setDarkMode } = useContext(ThemeContext); // ✅ Use ThemeContext
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
    <div className="flex-1 p-10 bg-white dark:bg-gray-900 text-black dark:text-white">
      <UserTable
        users={users}
        handleUserChange={handleUserChange}
        togglePasswordVisibility={togglePasswordVisibility}
        passwordVisibility={passwordVisibility}
        handleAddUser={handleAddUser}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
      {showDeleteConfirm && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default UserManagement;