import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TimeTable = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const { user } = useAuth();

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
  ];

  const timetableData = {
    monday: [
      { id: 1, subject: 'Mathematics', time: '9:00 - 10:00', room: '101', teacher: 'Dr. Smith' },
      { id: 2, subject: 'Physics', time: '10:00 - 11:00', room: '102', teacher: 'Prof. Johnson' },
      // ... more periods
    ],
    // ... other days
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Day Selection Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4 px-4" aria-label="Tabs">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`
                px-3 py-4 text-sm font-medium border-b-2 transition-colors
                ${selectedDay === day.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {day.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Timetable Grid */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {timetableData[selectedDay]?.map((period) => (
          <div
            key={period.id}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {period.time}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                Room {period.room}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {period.subject}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {period.teacher}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTable; 