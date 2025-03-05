import { useState, useEffect } from 'react'
import TimeTable from '../../components/ui/TimeTable';
import { motion } from 'framer-motion';
import { useTimetable } from '../../hooks/useTimetable';

const DailyView = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [nextClass, setNextClass] = useState(null);

  const { timetable, loading, error } = useTimetable('daily');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update next class every minute
  useEffect(() => {
    const updateNextClass = () => {
      const classes = getTodayClasses();
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const nextClass = classes.find(classItem => {
        const [time, period] = classItem.time.split(' ');
        const [hours, minutes] = time.split(':');
        let classHours = parseInt(hours);
        if (period === 'PM' && classHours !== 12) classHours += 12;
        if (period === 'AM' && classHours === 12) classHours = 0;
        const classTime = classHours * 60 + parseInt(minutes);
        return classTime > currentTime;
      });

      setNextClass(nextClass);
    };

    updateNextClass();
    const interval = setInterval(updateNextClass, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currentDate]);

  const navigateDay = async (direction) => {
    setIsLoading(true);
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  const getTodayClasses = () => {
    const dayOfWeek = currentDate.getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    const scheduleData = {
      monday: [
        { time: '9:00 AM', subject: 'Mathematics', room: '101', type: 'Lecture', teacher: 'Dr. Smith' },
        { time: '11:00 AM', subject: 'Physics', room: '102', type: 'Lab', teacher: 'Prof. Johnson' },
        { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
        { time: '2:00 PM', subject: 'Chemistry', room: '103', type: 'Lecture', teacher: 'Dr. Brown' },
      ],
      tuesday: [
        { time: '9:00 AM', subject: 'Computer Science', room: '201', type: 'Lab', teacher: 'Prof. Wilson' },
        { time: '11:00 AM', subject: 'English', room: '202', type: 'Lecture', teacher: 'Mrs. Davis' },
        { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
        { time: '2:00 PM', subject: 'Physics', room: '203', type: 'Lecture', teacher: 'Prof. Johnson' },
      ],
      wednesday: [
        { time: '9:00 AM', subject: 'Chemistry', room: '301', type: 'Lab', teacher: 'Dr. Brown' },
        { time: '11:00 AM', subject: 'Mathematics', room: '302', type: 'Lecture', teacher: 'Dr. Smith' },
        { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
        { time: '2:00 PM', subject: 'English', room: '303', type: 'Lecture', teacher: 'Mrs. Davis' },
      ],
      thursday: [
        { time: '9:00 AM', subject: 'Physics', room: '401', type: 'Lab', teacher: 'Prof. Johnson' },
        { time: '11:00 AM', subject: 'Computer Science', room: '402', type: 'Lecture', teacher: 'Prof. Wilson' },
        { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
        { time: '2:00 PM', subject: 'Mathematics', room: '403', type: 'Lecture', teacher: 'Dr. Smith' },
      ],
      friday: [
        { time: '9:00 AM', subject: 'English', room: '501', type: 'Lecture', teacher: 'Mrs. Davis' },
        { time: '11:00 AM', subject: 'Chemistry', room: '502', type: 'Lab', teacher: 'Dr. Brown' },
        { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
        { time: '2:00 PM', subject: 'Computer Science', room: '503', type: 'Lecture', teacher: 'Prof. Wilson' },
      ]
    };

    return scheduleData[days[dayOfWeek]] || [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <p className="text-red-500 dark:text-red-400">
          Error loading timetable: {error}
        </p>
      </motion.div>
    );
  }

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
              Today&apos;s Schedule
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateDay(-1)}
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
                {currentDate.toLocaleDateString('en-US', {
                  weekday: isMobileView ? 'short' : 'long',
                  month: isMobileView ? 'short' : 'long',
                  day: 'numeric'
                })}
              </span>
              <button
                onClick={() => navigateDay(1)}
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

          {/* Next Class Info */}
          {nextClass && (
            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-3 
                          border border-blue-200/50 dark:border-blue-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Next Class
                  </p>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    {nextClass.subject}
                  </h3>
                  {nextClass.teacher && (
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {nextClass.teacher}
                    </p>
                  )}
                </div>
                <div className="flex justify-between sm:justify-end items-center sm:text-right gap-4 sm:gap-6 mt-2 sm:mt-0">
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Time
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {nextClass.time}
                    </p>
                  </div>
                  {nextClass.room && (
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Room
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {nextClass.room}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Timetable Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-sm p-4 
                     border border-gray-200/50 dark:border-gray-700/50"
        >
          <TimeTable 
            isMobileView={isMobileView} 
            currentDate={currentDate}
            classes={timetable}
            getClassTypeColor={(type) => {
              switch (type) {
                case 'Lecture':
                  return 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300';
                case 'Lab':
                  return 'bg-purple-500/10 dark:bg-purple-400/10 text-purple-700 dark:text-purple-300';
                case 'break':
                  return 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300';
                default:
                  return 'bg-gray-500/10 dark:bg-gray-400/10 text-gray-700 dark:text-gray-300';
              }
            }}
            getClassBgColor={(type) => {
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
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DailyView;