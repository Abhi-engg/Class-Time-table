import React from 'react';

const Timetable = () => {
  const timetableData = {
    Monday: [
      { time: '9:00 AM', subject: 'Math 📚' },
      { time: '11:00 AM', subject: 'Physics ⚡' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Chemistry 🧪' },
      { time: '2:00 PM', subject: 'Biology 🌿' },
    ],
    // Add more days...
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              📅 {day}
            </h3>
            <div className="space-y-2">
              {timetableData[day]?.map((entry, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-lg">{entry.time.startsWith('9') ? '🕘' : '⏰'}</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {entry.time} - {entry.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;