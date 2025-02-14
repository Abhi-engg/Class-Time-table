import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const WeeklyView = () => {
  const { currentUser } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Add resize listener
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const weeklySchedule = {
    Monday: [
      { time: '9:00 AM', subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
      { time: '11:00 AM', subject: 'Physics', teacher: 'Prof. Johnson', room: '102' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Chemistry', teacher: 'Dr. Davis', room: '103' },
      { time: '2:00 PM', subject: 'Biology', teacher: 'Mrs. Wilson', room: '104' },
    ],
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Weekly Schedule
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Previous week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Week of {currentWeek.toLocaleDateString()}
            </span>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Next week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Department</p>
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{currentUser?.department}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Year</p>
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{currentUser?.year}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Class</p>
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{currentUser?.className}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Roll Number</p>
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{currentUser?.rollNumber}</p>
          </div>
        </div>

        {/* Schedule View */}
        {isMobileView ? (
          // Mobile List View
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white">{day}</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {timeSlots.map((time) => {
                    const classInfo = getClassForTimeSlot(day, time);
                    if (!classInfo) return null;
                    return (
                      <motion.div
                        key={`${day}-${time}`}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {classInfo.subject}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {classInfo.teacher}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Room {classInfo.room}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {time}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Grid View
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700">
                <div className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                  Time
                </div>
                {days.map((day) => (
                  <div key={day} className="p-4 font-medium text-gray-900 dark:text-white text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                    {time}
                  </div>
                  {days.map((day) => {
                    const classInfo = getClassForTimeSlot(day, time);
                    return (
                      <motion.div
                        key={`${day}-${time}`}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 ${classInfo ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                      >
                        {classInfo && (
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">
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
        )}
      </div>
    </div>
  );
};

export default WeeklyView;