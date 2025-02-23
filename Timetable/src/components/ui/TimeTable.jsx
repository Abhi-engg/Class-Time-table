import { motion } from 'framer-motion';

const TimeTable = ({ 
  isMobileView, 
  currentDate, 
  getClassTypeColor, 
  getClassBgColor,
  classes = []
}) => {
  return (
    <div className="space-y-4">
      {classes.map((classItem, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`${getClassBgColor(classItem.type)} rounded-lg 
                     border border-gray-200/50 dark:border-gray-700/50`}
        >
          <div className="p-4">
            {/* Time and Type Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {classItem.time}
              </span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium 
                              ${getClassTypeColor(classItem.type)}`}>
                {classItem.type}
              </span>
            </div>

            {/* Subject and Teacher */}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {classItem.subject}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {classItem.teacher}
              </span>
              {classItem.room && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Room {classItem.room}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {classes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No classes scheduled for today
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TimeTable; 