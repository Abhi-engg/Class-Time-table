import { useState } from 'react';
import { motion, } from 'framer-motion';
import PropTypes from 'prop-types';

const Calendar = ({ events = [], onSelectDate, selectedDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
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
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    return events.filter(event => formatDate(new Date(event.date)) === formatDate(date));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px">
          {generateCalendarDays().map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="bg-gray-50 dark:bg-gray-900/50 h-24"
                />
              );
            }

            const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
            const isToday = formatDate(date) === formatDate(new Date());
            const dateEvents = getEventsForDate(date);

            return (
              <motion.button
                key={date.toString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectDate(date)}
                className={`
                  relative h-24 p-2 hover:bg-gray-50 dark:hover:bg-gray-700
                  ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}
                  ${isToday ? 'bg-yellow-50 dark:bg-yellow-900/30' : ''}
                `}
              >
                <span
                  className={`
                    text-sm font-medium
                    ${isToday ? 'text-yellow-600 dark:text-yellow-400' : ''}
                    ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : ''}
                  `}
                >
                  {date.getDate()}
                </span>

                {/* Event indicators */}
                <div className="mt-1 space-y-1">
                  {dateEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-1 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      title: PropTypes.string
    })
  ),
  onSelectDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date)
};

export default Calendar; 