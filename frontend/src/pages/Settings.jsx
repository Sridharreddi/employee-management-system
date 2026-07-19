import { useState } from "react";
import {
  FaCog,
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaSave,
} from "react-icons/fa";

import "../styles/Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    company: "ABC Technologies",
    email: "admin@abctech.com",
    phone: "+91 9876543210",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="settings-page">
      <div className="employee-header">
        <div>
          <span className="page-badge">
            <FaCog />
            System Settings
          </span>

          <h1>Settings</h1>

          <p>
            Manage your HRMS preferences, company details and account settings.
          </p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-card">
          <h2>
            <FaUser />
            Company Information
          </h2>

          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              name="company"
              value={settings.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-card">
          <h2>
            <FaBell />
            Preferences
          </h2>

          <div className="toggle-row">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
          </div>

          <div className="toggle-row">
            <span>Dark Mode</span>

            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-card">
          <h2>
            <FaLock />
            Security
          </h2>

          <button className="settings-btn">Change Password</button>

          <button className="settings-btn">Two-Factor Authentication</button>

          <button className="settings-btn">Login History</button>
        </div>

        <div className="settings-card">
          <h2>
            <FaPalette />
            Appearance
          </h2>

          <button className="settings-btn">Blue Theme</button>

          <button className="settings-btn">Light Theme</button>

          <button className="settings-btn">Dark Theme</button>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        <FaSave />
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
