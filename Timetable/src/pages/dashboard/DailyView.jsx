import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TimeTable from '../../components/ui/TimeTable';

const DailyView = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{user?.department}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Year</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{user?.year}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Class</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{user?.className}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Roll Number</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{user?.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Timetable Component */}
      <TimeTable />
    </div>
  );
};

export default DailyView; 