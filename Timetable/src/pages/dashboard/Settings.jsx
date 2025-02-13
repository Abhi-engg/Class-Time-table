import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Select from '../../components/common/Select';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    schedule: true,
    updates: false
  });
  const [theme, setTheme] = useState('system');
  const [loading, setLoading] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save settings logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {/* Notification Settings */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Notification Preferences
          </h2>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email updates about your schedule
              </p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${notifications.email ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                  transition duration-200 ease-in-out
                  ${notifications.email ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive push notifications for important updates
              </p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${notifications.push ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                  transition duration-200 ease-in-out
                  ${notifications.push ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </Card.Body>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Appearance
          </h2>
        </Card.Header>
        <Card.Body>
          <Select
            label="Theme"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
          />
        </Card.Body>
      </Card>

      {/* Account Settings */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Account Information
          </h2>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Department
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.department}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Year
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.year}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Class
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.className}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Roll Number
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.rollNumber}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          isLoading={loading}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings; 