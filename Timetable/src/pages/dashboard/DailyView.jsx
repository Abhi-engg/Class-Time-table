import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TimeTable from '../../components/ui/TimeTable';

const DailyView = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome, {currentUser?.displayName || 'User'}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Department</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.department}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Year</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.year}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Class</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.className}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Roll Number</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Timetable Component */}
      <TimeTable />
    </div>
  );
};

export default DailyView;