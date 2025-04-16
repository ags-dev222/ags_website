import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const SettingsForm = ({ initialSettings, onSave }) => {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <input
        type="text"
        name="username"
        value={settings.username}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={settings.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Email"
      />
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
      <button onClick={() => onSave(settings)} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4">
        Save Changes
      </button>
    </div>
  );
};

// ✅ Add PropTypes Validation
SettingsForm.propTypes = {
  initialSettings: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    notifications: PropTypes.bool.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SettingsForm;
