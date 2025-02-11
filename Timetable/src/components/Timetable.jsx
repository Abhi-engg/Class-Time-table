import React, { useState } from 'react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 9);
  const [schedule, setSchedule] = useState({});

  const handleCellClick = (day, time) => {
    const key = `${day}-${time}`;
    const subject = window.prompt('Enter subject name:');
    if (subject) {
      setSchedule(prev => ({
        ...prev,
        [key]: subject
      }));
    }
  };

  const getSubject = (day, time) => {
    const key = `${day}-${time}`;
    return schedule[key] || '';
  };

  const getRandomColor = (subject) => {
    if (!subject) return '';
    const colors = [
      'bg-pink-100 text-pink-800 border-pink-200', 
      'bg-blue-100 text-blue-800 border-blue-200', 
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200', 
      'bg-yellow-100 text-yellow-800 border-yellow-200', 
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200', 
      'bg-red-100 text-red-800 border-red-200', 
      'bg-teal-100 text-teal-800 border-teal-200'
    ];
    const hash = subject.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-6 md:hidden">
      {days.map(day => (
        <div key={day} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white py-3 px-4 text-lg font-semibold">
            {day}
          </div>
          <div className="divide-y divide-gray-100">
            {timeSlots.map(time => {
              const subject = getSubject(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  onClick={() => handleCellClick(day, time)}
                  className={`p-4 flex justify-between items-center cursor-pointer
                    ${subject ? getRandomColor(subject) : 'hover:bg-gray-50'}`}
                >
                  <span className="text-sm font-medium">
                    {`${time}:00 - ${time + 1}:00`}
                  </span>
                  {subject ? (
                    <span className="font-medium">{subject}</span>
                  ) : (
                    <span className="text-gray-400 text-sm">Tap to add</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop Table View
  const DesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-white text-left">Time</th>
            {days.map(day => (
              <th key={day} className="p-3 text-white text-left font-medium">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time} className="border-b border-gray-100">
              <td className="p-3 text-sm font-medium text-gray-900 bg-gray-50">
                {`${time}:00 - ${time + 1}:00`}
              </td>
              {days.map(day => {
                const subject = getSubject(day, time);
                return (
                  <td
                    key={`${day}-${time}`}
                    onClick={() => handleCellClick(day, time)}
                    className={`p-3 cursor-pointer transition-colors
                      ${subject ? getRandomColor(subject) : 'hover:bg-gray-50'}`}
                  >
                    {subject || <span className="text-gray-400">Click to add</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Class Timetable
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            {window.innerWidth < 768 ? 'Tap any slot to add subject' : 'Click any slot to add subject'}
          </p>
        </div>

        <MobileView />
        <DesktopView />

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Subjects are color-coded for easy identification</p>
        </div>
      </div>
    </div>
  );
};

export default Timetable; 