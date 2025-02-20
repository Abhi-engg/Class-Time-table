import { useState } from 'react';
import { motion } from 'framer-motion';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calendar generation helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Sample events data
  const events = {
    '2024-03-15': [
      { type: 'class', title: 'Mathematics', time: '9:00 AM', room: '101' },
      { type: 'exam', title: 'Physics Quiz', time: '11:00 AM', room: '102' },
    ],
    '2024-03-20': [
      { type: 'assignment', title: 'Chemistry Lab', time: '2:00 PM', room: '103' },
    ],
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    return events[formatDate(date)] || [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Calendar View
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {generateCalendarDays().map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="p-4 border-b border-r border-gray-200 dark:border-gray-700" />;
            }

            const events = getEventsForDate(date);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <motion.div
                key={date.toString()}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-4 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer
                  ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}
                  ${isToday ? 'bg-yellow-50 dark:bg-yellow-900/30' : ''}
                `}
                onClick={() => setSelectedDate(date)}
              >
                <div className="flex flex-col h-full">
                  <span className={`
                    text-sm font-medium mb-1
                    ${isToday ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'}
                  `}>
                    {date.getDate()}
                  </span>
                  {events.map((event, i) => (
                    <div
                      key={i}
                      className={`
                        text-xs p-1 rounded mb-1
                        ${event.type === 'class' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                          event.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}
                      `}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.time} - Room {event.room}
                    </p>
                  </div>
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${event.type === 'class' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      event.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}
                  `}>
                    {event.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView; 