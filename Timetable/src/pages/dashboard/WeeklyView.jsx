import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const WeeklyView = () => {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Sample weekly schedule data
  const weeklySchedule = {
    Monday: [
      { time: '9:00 AM', subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
      { time: '11:00 AM', subject: 'Physics', teacher: 'Prof. Johnson', room: '102' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Chemistry', teacher: 'Dr. Davis', room: '103' },
      { time: '2:00 PM', subject: 'Biology', teacher: 'Mrs. Wilson', room: '104' },
    ],
    // Add more days...
  };

  const getClassForTimeSlot = (day, time) => {
    return weeklySchedule[day]?.find(slot => slot.time === time);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Weekly Schedule
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Week of {currentWeek.toLocaleDateString()}
            </span>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
            <p className="font-medium text-gray-900 dark:text-white">{user?.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
            <p className="font-medium text-gray-900 dark:text-white">{user?.year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
            <p className="font-medium text-gray-900 dark:text-white">{user?.className}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
            <p className="font-medium text-gray-900 dark:text-white">{user?.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700">
          {/* Time column header */}
          <div className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
            Time
          </div>
          {/* Day column headers */}
          {days.map((day) => (
            <div key={day} className="p-4 font-medium text-gray-900 dark:text-white text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700">
            {/* Time column */}
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
              {time}
            </div>
            {/* Day columns */}
            {days.map((day) => {
              const classInfo = getClassForTimeSlot(day, time);
              return (
                <motion.div
                  key={`${day}-${time}`}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 ${classInfo ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}
                >
                  {classInfo && (
                    <div className="space-y-1">
                      <p className="font-medium text-indigo-600 dark:text-indigo-400">
                        {classInfo.subject}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {classInfo.teacher}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Room {classInfo.room}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyView; 