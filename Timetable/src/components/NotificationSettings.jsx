import { useState } from 'react';
import PropTypes from 'prop-types';

const NotificationSettings = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    reminderTime: 10, // minutes before class
    notifications: {
      upcoming: true,
      changes: true,
      daily: false,
      weekly: false
    },
    customTimes: []
  });

  const [newCustomTime, setNewCustomTime] = useState('');

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const addCustomTime = () => {
    if (newCustomTime && !settings.customTimes.includes(newCustomTime)) {
      setSettings({
        ...settings,
        customTimes: [...settings.customTimes, newCustomTime]
      });
      setNewCustomTime('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Notification Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Reminder Time
            </label>
            <select
              value={settings.reminderTime}
              onChange={(e) => setSettings({...settings, reminderTime: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="5">5 minutes before</option>
              <option value="10">10 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notification Types
            </label>
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-gray-800 dark:text-gray-600"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {key} notifications
                </label>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Reminder Times
            </label>
            <div className="flex space-x-2 mt-1">
              <input
                type="time"
                value={newCustomTime}
                onChange={(e) => setNewCustomTime(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={addCustomTime}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {settings.customTimes.map((time) => (
                <span
                  key={time}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >
                  {time}
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      customTimes: settings.customTimes.filter(t => t !== time)
                    })}
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

NotificationSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default NotificationSettings; 