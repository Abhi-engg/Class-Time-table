import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ExamView = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Get dates for the current week
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start from Monday

    for (let i = 0; i < 5; i++) { // Monday to Friday
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  }, [currentDate]);

  const navigateWeek = async (direction) => {
    setIsLoading(true);
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  // Exam schedule data
  const examSchedule = weekDates.map(date => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    // Format date string for comparison
    const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

    // Check if it's a holiday (example: Mahashivratri)
    const holidays = {
      '2025-02-26': 'Mahashivratri',
      // Add more holidays as needed
    };

    if (holidays[formattedDate]) {
      return {
        date: formattedDate,
        day,
        exams: [
          {
            subject: holidays[formattedDate],
            time: 'All Day',
            type: 'Holiday',
            room: '-',
            syllabus: 'Holiday'
          }
        ]
      };
    }

    // Regular exam schedule
    return {
      date: formattedDate,
      day,
      exams: [
        {
          subject: day === 'Monday' ? 'Engineering Mathematics' :
                   day === 'Tuesday' ? 'Physics' :
                   day === 'Wednesday' ? 'Chemistry' :
                   day === 'Thursday' ? 'Computer Science' :
                   'English',
          time: '10:00 AM - 12:00 PM',
          room: '301',
          type: 'Unit Test',
          syllabus: 'Unit 1 & 2'
        }
      ]
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/30 via-blue-50/20 to-indigo-50/30 
                    dark:from-gray-900/30 dark:via-blue-900/20 dark:to-indigo-900/30 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm p-4 
                     border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Exam Schedule
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek(-1)}
                disabled={isLoading}
                className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 
                         hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Week of {weekDates[0]?.toLocaleDateString('en-US', {
                  month: isMobileView ? 'short' : 'long',
                  day: 'numeric'
                })}
              </span>
              <button
                onClick={() => navigateWeek(1)}
                disabled={isLoading}
                className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 
                         hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Exam Schedule */}
        <div className="space-y-4">
          {examSchedule.map((day) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm 
                        border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {day.day}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {day.exams.map((exam, index) => (
                  <motion.div
                    key={index}
                    className={`${
                      exam.type === 'Holiday' 
                        ? 'bg-amber-50/50 dark:bg-amber-900/20 hover:bg-amber-100/50 dark:hover:bg-amber-900/30'
                        : exam.type === 'Mid Term'
                        ? 'bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'
                        : 'bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30'
                    } rounded-lg p-4 mb-3 last:mb-0 border border-gray-200/50 dark:border-gray-700/50`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {exam.time}
                      </span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        exam.type === 'Holiday'
                          ? 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300'
                          : exam.type === 'Mid Term'
                          ? 'bg-purple-500/10 dark:bg-purple-400/10 text-purple-700 dark:text-purple-300'
                          : 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300'
                      }`}>
                        {exam.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {exam.subject}
                    </h3>
                    {exam.type !== 'Holiday' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500 dark:text-gray-400">
                          Room: {exam.room}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Syllabus: {exam.syllabus}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm p-4 
                     border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Important Instructions
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>Arrive at least 15 minutes before the examination time</li>
            <li>Bring your student ID card and hall ticket</li>
            <li>No electronic devices allowed in the examination hall</li>
            <li>Read all questions carefully before attempting</li>
            <li>Write your roll number on every page</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ExamView; 