import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CalendarView = () => {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample timetable data - replace with your actual data
  const timetableData = {
    monday: [
      { id: 1, subject: 'Mathematics', time: '9:00 - 10:00', room: '101', teacher: 'Dr. Smith' },
      { id: 2, subject: 'Physics', time: '10:00 - 11:00', room: '102', teacher: 'Prof. Johnson' },
    ],
    tuesday: [
      { id: 3, subject: 'Chemistry', time: '9:00 - 10:00', room: '103', teacher: 'Dr. Davis' },
      { id: 4, subject: 'Biology', time: '10:00 - 11:00', room: '104', teacher: 'Prof. Wilson' },
    ],
    // Add more days as needed
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get days in current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Info */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {user.department} - {user.year} - Class {user.className}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number: {user.rollNumber}</p>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div
                key={day}
                className="aspect-square p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">{day}</div>
                {/* Add class indicators here */}
                <div className="mt-1">
                  {day % 7 === 1 && timetableData.monday && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {timetableData.monday[0].subject}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView; 