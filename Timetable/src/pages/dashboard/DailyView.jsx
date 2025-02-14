import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TimeTable from '../../components/ui/TimeTable';

const DailyView = () => {
  const { currentUser } = useAuth();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {currentUser?.name || 'Guest'}!
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Department
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
              {currentUser?.department || 'N/A'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Year
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
              {currentUser?.year || 'N/A'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Class
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
              {currentUser?.className || 'N/A'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Roll Number
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
              {currentUser?.rollNumber || 'N/A'}
            </p>
          </div>
        </div>

        {/* Timetable Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Today's Schedule
          </h2>
          <div className="overflow-x-auto">
            <TimeTable isMobileView={isMobileView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyView;