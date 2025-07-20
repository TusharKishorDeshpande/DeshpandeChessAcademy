import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { settings } from "../../../utils/api";

// Theme colors
const theme = {
  card: "bg-gray-800",
  primaryText: "text-gray-100",
  secondaryText: "text-gray-400",
  accentBg: "bg-yellow-500",
  accentHoverBg: "hover:bg-yellow-600",
  borderColor: "border-gray-700",
  focusRing: "focus:ring-yellow-500",
  focusBorder: "focus:border-yellow-500",
};

// Helper component for form inputs
const Input = ({ id, label, type = "text", value, onChange, placeholder }) => (
  <div className="flex-1">
    <label
      htmlFor={id}
      className={`block text-sm font-medium ${theme.secondaryText} mb-1`}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 ${theme.card} ${theme.borderColor} border rounded-md shadow-sm ${theme.focusRing} ${theme.focusBorder} sm:text-sm ${theme.primaryText} bg-gray-900`}
    />
  </div>
);

function Settings() {
  const [emails, setEmails] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch settings from backend
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settings.get();
      const settingsData = response.data.data;
      setEmails(settingsData.notificationEmails || []);
      setNotifications(settingsData.emailNotifications || true);
      setError("");
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (newEmail && !emails.includes(newEmail)) {
      try {
        const updatedEmails = [...emails, newEmail];
        await settings.updateEmails(updatedEmails);
        setEmails(updatedEmails);
        setNewEmail("");
        setError("");
      } catch (err) {
        console.error("Failed to add email:", err);
        setError("Failed to add email address");
      }
    }
  };

  const handleRemoveEmail = async (emailToRemove) => {
    try {
      const updatedEmails = emails.filter((email) => email !== emailToRemove);
      await settings.updateEmails(updatedEmails);
      setEmails(updatedEmails);
      setError("");
    } catch (err) {
      console.error("Failed to remove email:", err);
      setError("Failed to remove email address");
    }
  };

  const handleNotificationToggle = async () => {
    try {
      const newNotificationState = !notifications;
      await settings.updateNotifications(newNotificationState);
      setNotifications(newNotificationState);
      setError("");
    } catch (err) {
      console.error("Failed to update notifications:", err);
      setError("Failed to update notification settings");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-0">
      <h2 className={`text-2xl lg:text-3xl font-bold text-yellow-500 mb-6`}>
        Settings
      </h2>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div
        className={`${theme.card} p-4 lg:p-6 rounded-lg shadow-md border ${theme.borderColor} space-y-6 lg:space-y-8`}
      >
        {/* Email Notifications Toggle */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b ${theme.borderColor} space-y-4 sm:space-y-0`}
        >
          <div>
            <h3 className={`text-lg font-semibold ${theme.primaryText}`}>
              Email Notifications
            </h3>
            <p className={`text-sm ${theme.secondaryText}`}>
              Receive an email for each new contact form submission.
            </p>
          </div>
          <button
            onClick={handleNotificationToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              notifications ? theme.accentBg : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Notification Recipients */}
        <div>
          <h3 className={`text-lg font-semibold ${theme.primaryText}`}>
            Notification Recipients
          </h3>
          <p className={`text-sm ${theme.secondaryText} mb-4`}>
            Add or remove email addresses that receive notifications.
          </p>

          <form
            onSubmit={handleAddEmail}
            className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-2 mb-4"
          >
            <Input
              id="newEmail"
              label="Email Address"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
            />
            <button
              type="submit"
              className={`${theme.accentBg} text-black px-4 py-2 rounded-md ${theme.accentHoverBg} transition-colors shadow h-10 font-semibold w-full sm:w-auto`}
            >
              Add
            </button>
          </form>

          <div className="space-y-2">
            {emails.length === 0 ? (
              <div
                className={`bg-gray-900 p-4 rounded-md border ${theme.borderColor} text-center`}
              >
                <p className={`${theme.secondaryText}`}>
                  No email addresses configured. Add an email address to receive
                  notifications.
                </p>
              </div>
            ) : (
              emails.map((email) => (
                <div
                  key={email}
                  className={`flex items-center justify-between bg-gray-900 p-3 rounded-md border ${theme.borderColor}`}
                >
                  <span className={`${theme.primaryText} truncate mr-2`}>
                    {email}
                  </span>
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-700 transition-colors flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
