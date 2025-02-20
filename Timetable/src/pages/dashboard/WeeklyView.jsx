import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WeeklyView = () => {
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
      { time: '9:00 AM', subject: 'Mathematics', room: '101', type: 'Lecture' },
      { time: '11:00 AM', subject: 'Physics', room: '102', type: 'Lab' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '2:00 PM', subject: 'Chemistry', room: '103', type: 'Lecture' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Chemistry', room: '103', type: 'Lecture' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '2:00 PM', subject: 'Biology', room: '104', type: 'Lab' },
    ],
    Wednesday: [
      { time: '9:00 AM', subject: 'Computer Science', room: '105', type: 'Lab' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'English', room: '106', type: 'Lecture' },
    ],
    Thursday: [
      { time: '11:00 AM', subject: 'History', room: '107', type: 'Lecture' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '3:00 PM', subject: 'Geography', room: '108', type: 'Lab' },
    ],
    Friday: [
      { time: '10:00 AM', subject: 'Art', room: '109', type: 'Lab' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '2:00 PM', subject: 'Music', room: '110', type: 'Lecture' },
    ],
  };

  const getClassForTimeSlot = (day, time) => {
    return weeklySchedule[day]?.find(slot => slot.time === time);
  };

  const getClassTypeColor = (type) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20';
      case 'Lab':
        return 'bg-purple-500/10 dark:bg-purple-400/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 dark:border-purple-400/20';
      case 'break':
        return 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 dark:border-amber-400/20';
      default:
        return 'bg-gray-500/10 dark:bg-gray-400/10 text-gray-700 dark:text-gray-300 border border-gray-500/20 dark:border-gray-400/20';
    }
  };

  const getClassBgColor = (type) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30';
      case 'Lab':
        return 'bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/50 dark:hover:bg-purple-900/30';
      case 'break':
        return 'bg-amber-50/50 dark:bg-amber-900/20 hover:bg-amber-100/50 dark:hover:bg-amber-900/30';
      default:
        return 'bg-gray-50/50 dark:bg-gray-900/20 hover:bg-gray-100/50 dark:hover:bg-gray-900/30';
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  const renderCellContent = (classInfo) => {
    if (!classInfo) return null;

    return (
      <div className="space-y-2">
        <p className="font-medium text-gray-900 dark:text-white font-cabinet">
          {classInfo.subject}
        </p>
        <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getClassTypeColor(classInfo.type)}`}>
          {classInfo.type === 'break' ? '🍽️ Break' : classInfo.type}
        </span>
        {classInfo.type !== 'break' && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Room {classInfo.room}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white/30 dark:bg-gray-900/30 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-clash">
            Weekly Schedule
          </h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateWeek(-1)}
              className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200"
              aria-label="Previous week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap font-cabinet">
              Week of {currentWeek.toLocaleDateString()}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateWeek(1)}
              className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200"
              aria-label="Next week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Schedule View with updated mobile styling */}
        {isMobileView ? (
          // Mobile List View with reduced blur and adjusted transparency
          <div className="space-y-4">
            {days.map((day) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-b border-gray-200/50 dark:border-gray-600/50">
                  <h3 className="font-medium text-gray-900 dark:text-white font-clash">{day}</h3>
                </div>
                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {timeSlots.map((time) => {
                    const classInfo = getClassForTimeSlot(day, time);
                    if (!classInfo) return null;
                    return (
                      <motion.div
                        key={`${day}-${time}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-4 transition-colors duration-200 ${getClassBgColor(classInfo.type)}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            {renderCellContent(classInfo)}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-cabinet">
                            {time}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop Grid View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-sm overflow-x-auto border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm font-cabinet">
                  Time
                </div>
                {days.map((day) => (
                  <div key={day} className="p-4 font-medium text-gray-900 dark:text-white text-sm font-clash">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200/50 dark:border-gray-700/50 font-cabinet">
                    {time}
                  </div>
                  {days.map((day) => {
                    const classInfo = getClassForTimeSlot(day, time);
                    return (
                      <motion.div
                        key={`${day}-${time}`}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 transition-colors duration-200 ${classInfo ? getClassBgColor(classInfo.type) : ''}`}
                      >
                        {renderCellContent(classInfo)}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeeklyView;