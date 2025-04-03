import React from 'react';

const UserTable = ({
  users,
  handleUserChange,
  togglePasswordVisibility,
  passwordVisibility,
  handleAddUser,
  setShowDeleteConfirm,
}) => {
  return (
    <div className="w-full">
      {/* All Users and Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          All Users ({users.length})
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-64"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isVisible = passwordVisibility[user.id] || false;
              return (
                <tr key={user.id} className="border-b dark:border-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={user.firstName}
                      onChange={(e) => handleUserChange(user.id, 'firstName', e.target.value)}
                      className="w-full p-2 bg-transparent border-none focus:border focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                      placeholder="First Name"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={user.lastName}
                      onChange={(e) => handleUserChange(user.id, 'lastName', e.target.value)}
                      className="w-full p-2 bg-transparent border-none focus:border focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                      placeholder="Last Name"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleUserChange(user.id, 'email', e.target.value)}
                      className="w-full p-2 bg-transparent border-none focus:border focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                      placeholder="Email"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleUserChange(user.id, 'role', e.target.value)}
                      className="w-full p-2 bg-transparent border-none focus:border focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 appearance-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type={isVisible ? 'text' : 'password'}
                        value={user.password}
                        onChange={(e) => handleUserChange(user.id, 'password', e.target.value)}
                        className="w-full p-2 bg-transparent border-none focus:border focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                        placeholder="Password"
                      />
                      <button
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        aria-label={isVisible ? 'Hide password' : 'Show password'}
                      >
                        {isVisible ? (
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {user.dateAdded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setShowDeleteConfirm(user.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New User Button */}
      <div className="mt-4 flex items-center">
        <button
          onClick={handleAddUser}
          className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <span className="ml-2 text-green-600 font-medium">Add new user</span>
      </div>
    </div>
  );
};

export default UserTable;