import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "admin_user",
    email: "admin@example.com",
    password: "",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="New Password"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Enable Email Notifications</span>
        </label>
        <label className="flex items-center space-x-3 mt-4">
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Enable Dark Mode</span>
        </label>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
