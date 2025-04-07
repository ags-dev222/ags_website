import React, { useState } from "react";
import { Eye, EyeOff, X, UploadCloud } from "lucide-react";

const AccountSettings = () => {
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
      <div className="w-1/2 max-w-lg bg-white p-5 border rounded-lg">
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-green-700 flex items-center justify-center">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xl font-bold">S</span>
            )}
          </div>

          <div className="ml-4">
            <h3 className="text-lg text-black font-bold">{profile.name}</h3>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <span className="inline-block bg-gray-200 text-green-700 px-2 py-1 text-xs rounded">Admin</span>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className="ml-auto border px-8 py-2 text-xs font-semibold rounded-full text-green-600 hover:bg-gray-100"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-1/2 max-w-lg bg-white p-5 border rounded-lg mt-5">
        <h3 className="text-lg text-black font-bold mb-3">Security Settings</h3>
        <form onSubmit={handleSubmit} className="text-black space-y-4">
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
                className="w-full p-2 text-xs border rounded bg-gray-100 pr-10"
              />
              <button
                type="button"
                onClick={() => toggleVisibility(field)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
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
                ? "bg-green-700 text-white hover:bg-green-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </form>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-black font-bold">Edit Profile</p>
              <button onClick={() => setIsEditOpen(false)}>
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div
              className="border-dashed border-2 border-gray-300 h-32 p-4 rounded-md text-center mb-4 flex items-center justify-center space-x-2 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <UploadCloud className="text-gray-400" size={18} />
              <p className="text-gray-500 text-xs">Drag and Drop files here or</p>
              <label htmlFor="file-upload" className="text-green-600 text-xs cursor-pointer">Choose File</label>
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
              className="w-full p-2 mb-3 border rounded text-xs text-black bg-gray-100"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 mb-4 border rounded text-xs text-black bg-gray-100"
            />

            <button onClick={() => setIsEditOpen(false)} className="w-full text-xs bg-green-600 text-white py-2 rounded-full">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
