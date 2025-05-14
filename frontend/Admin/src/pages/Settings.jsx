import React, { useState, useContext } from "react";
import { Eye, EyeOff, X, UploadCloud } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const AccountSettings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Solomon Adjei",
    email: "corporate@ags.com",
    avatar: null,
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setVisible({ ...visible, [field]: !visible[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed:", passwords);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  return (
    <div className="flex flex-col items-center mb-64 mt-8">
      {/* Profile Section */}
      <div
        className={`w-1/2 max-w-lg p-5 border rounded-lg ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-green-700 flex items-center justify-center">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xl font-bold">S</span>
            )}
          </div>

          <div className="ml-4">
            <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-black"}`}>
              {profile.name}
            </h3>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
              {profile.email}
            </p>
            <span
              className={`inline-block px-2 py-1 text-xs rounded ${
                darkMode
                  ? "bg-gray-700 text-green-400"
                  : "bg-gray-200 text-green-700"
              }`}
            >
              Admin
            </span>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className={`ml-auto border px-8 py-2 text-xs font-semibold rounded-full ${
              darkMode
                ? "border-gray-600 text-green-400 hover:bg-gray-800"
                : "border-gray-300 text-green-600 hover:bg-gray-100"
            }`}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Security Settings Section */}
      <div
        className={`w-1/2 max-w-lg p-5 border rounded-lg mt-5 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-black"}`}>
          Security Settings
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(passwords).map((field, index) => (
            <div key={index} className="relative">
              <input
                type={visible[field] ? "text" : "password"}
                name={field}
                placeholder={
                  field === "currentPassword"
                    ? "Current Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"
                }
                value={passwords[field]}
                onChange={handleChange}
                className={`w-full p-2 text-xs border rounded pr-10 ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-gray-100 text-black"
                }`}
              />
              <button
                type="button"
                onClick={() => toggleVisibility(field)}
                className={`absolute inset-y-0 right-3 flex items-center ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {visible[field] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          ))}
          <button
            type="submit"
            disabled={!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword}
            className={`w-full text-xs py-2 rounded-full ${
              passwords.currentPassword && passwords.newPassword && passwords.confirmPassword
                ? darkMode
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-green-700 text-white hover:bg-green-800"
                : darkMode
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-20 z-50">
          <div
            className={`p-6 rounded-lg w-96 shadow-lg ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-black"}`}>
                Edit Profile
              </p>
              <button onClick={() => setIsEditOpen(false)}>
                <X
                  size={20}
                  className={darkMode ? "text-gray-400" : "text-gray-600"}
                />
              </button>
            </div>

            <div
              className={`border-dashed border-2 h-32 p-4 rounded-md text-center flex items-center justify-center space-x-2 cursor-pointer ${
                darkMode ? "border-gray-600" : "border-gray-300"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <UploadCloud
                className={darkMode ? "text-gray-400" : "text-gray-400"}
                size={18}
              />
              <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                Drag and Drop files here or
              </p>
              <label
                htmlFor="file-upload"
                className={`text-xs ${
                  darkMode ? "text-green-400" : "text-green-600"
                } cursor-pointer`}
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className={`w-full p-2 mb-3 border rounded text-xs ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white"
                  : "border-gray-300 bg-gray-100 text-black"
              }`}
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className={`w-full p-2 mb-4 border rounded text-xs ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white"
                  : "border-gray-300 bg-gray-100 text-black"
              }`}
            />

            <button
              onClick={() => setIsEditOpen(false)}
              className={`w-full text-xs py-2 rounded-full ${
                darkMode
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;