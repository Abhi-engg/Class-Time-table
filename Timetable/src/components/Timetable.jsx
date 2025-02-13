import React, { useState, useRef } from 'react';
// Import icons from react-icons
import { MdPerson, MdRoom, MdGroup, MdSubject } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../contexts/AuthContext';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-64">
    <div className="text-red-500 mb-4">{message}</div>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
    >
      Try Again
    </button>
  </div>
);

const Timetable = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('monday');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Timetable-${user?.department}-${user?.year}-${user?.className}`,
  });

  // Sample timetable data - replace with your actual data
  const timetableData = {
    monday: [
      { id: 1, subject: 'Mathematics', time: '9:00 - 10:00', room: '101', teacher: 'Dr. Smith' },
      { id: 2, subject: 'Physics', time: '10:00 - 11:00', room: '102', teacher: 'Prof. Johnson' },
      { id: 3, subject: 'Computer Science', time: '11:15 - 12:15', room: '103', teacher: 'Dr. Williams' },
      { id: 4, subject: 'English', time: '1:00 - 2:00', room: '104', teacher: 'Mrs. Brown' },
    ],
    tuesday: [
      { id: 5, subject: 'Chemistry', time: '9:00 - 10:00', room: '201', teacher: 'Dr. Davis' },
      { id: 6, subject: 'Biology', time: '10:00 - 11:00', room: '202', teacher: 'Prof. Miller' },
      { id: 7, subject: 'History', time: '11:15 - 12:15', room: '203', teacher: 'Mr. Wilson' },
      { id: 8, subject: 'Geography', time: '1:00 - 2:00', room: '204', teacher: 'Mrs. Taylor' },
    ],
    // Add more days as needed
  };

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
  ];

  const timeSlots = [
    '9:30-10:25',
    '10:25-11:20',
    '11:20-12:15',
    '12:15-1:00',
    '1:00-1:55',
    '1:55-2:50',
    '2:50-3:45',
    '3:45-4:40'
  ];
  const practicalGroups = ['D1', 'D2', 'D3'];
  const [schedule, setSchedule] = useState({});

  const handleCellClick = (day, time) => {
    const timeIndex = timeSlots.indexOf(time);
    const isLunchTime = time === '12:15-1:00';

    if (isLunchTime) {
      alert('Cannot schedule during lunch break');
      return;
    }

    const type = window.prompt('Enter type (lecture/practical):');
    
    if (type?.toLowerCase() === 'practical') {
      const startTimeIndex = window.prompt(
        `Enter start time slot number (1-${timeSlots.length}):\n` +
        timeSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n')
      );

      if (!startTimeIndex) return;

      const selectedTimeIndex = parseInt(startTimeIndex) - 1;
      if (isNaN(selectedTimeIndex) || selectedTimeIndex < 0 || selectedTimeIndex >= timeSlots.length - 1) {
        alert('Invalid time slot selected');
        return;
      }

      const selectedTime = timeSlots[selectedTimeIndex];
      const nextTimeSlot = timeSlots[selectedTimeIndex + 1];

      if (selectedTime === '12:15-1:00' || nextTimeSlot === '12:15-1:00') {
        alert('Cannot schedule practical across lunch break');
        return;
      }

      const currentKey = `${day}-${selectedTime}`;
      const nextSlotKey = `${day}-${nextTimeSlot}`;

      if (schedule[currentKey] || schedule[nextSlotKey]) {
        alert('One or both selected slots are already occupied');
        return;
      }

      const shouldAddMultipleGroups = window.confirm('Add different practicals for D1, D2, D3 groups?');
      
      if (shouldAddMultipleGroups) {
        const practicals = {};
        
        for (const group of practicalGroups) {
          const subject = window.prompt(`Enter practical subject for ${group}:`);
          if (subject) {
            const faculty = window.prompt(`Enter faculty for ${group}:`);
            const room = window.prompt(`Enter lab room for ${group}:`);
            practicals[group] = { subject, faculty, room, type: 'practical', group };
          }
        }
        
        if (Object.keys(practicals).length > 0) {
          const practicalData = { type: 'practical', groups: practicals, duration: 'first' };
          const nextSlotData = { ...practicalData, duration: 'second' };

          setSchedule(prev => ({
            ...prev,
            [currentKey]: practicalData,
            [nextSlotKey]: nextSlotData
          }));
        }
      } else {
        // Single practical for all groups
        const subject = window.prompt('Enter practical subject:');
        if (subject) {
          const faculty = window.prompt('Enter faculty name:');
          const room = window.prompt('Enter lab room:');
          const practicalData = { 
            subject, 
            faculty, 
            room, 
            type: 'practical', 
            group: 'All Groups',
            duration: 'first'
          };
          const nextSlotData = { ...practicalData, duration: 'second' };

          setSchedule(prev => ({
            ...prev,
            [currentKey]: practicalData,
            [nextSlotKey]: nextSlotData
          }));
        }
      }
    } else {
      // Regular lecture
      const subject = window.prompt('Enter subject name:');
      if (subject) {
        const faculty = window.prompt('Enter faculty name:');
        const room = window.prompt('Enter room number:');
        const key = `${day}-${time}`;
        setSchedule(prev => ({
          ...prev,
          [key]: { subject, faculty, room, type: 'lecture' }
        }));
      }
    }
  };

  const getScheduleInfo = (day, time) => {
    const key = `${day}-${time}`;
    return schedule[key] || null;
  };

  const getRandomColor = (subject, type) => {
    if (!subject) return '';
    const colors = type?.toLowerCase() === 'practical' ? [
      'bg-green-100 text-green-800 border-green-200',
      'bg-teal-100 text-teal-800 border-teal-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200'
    ] : [
      'bg-blue-100 text-blue-800 border-blue-200', 
      'bg-purple-100 text-purple-800 border-purple-200', 
      'bg-orange-100 text-orange-800 border-orange-200'
    ];
    const hash = subject.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  // Cell Content Component
  const CellContent = ({ scheduleInfo }) => {
    if (scheduleInfo.type === 'practical') {
      if (scheduleInfo.duration === 'second') {
        return (
          <div className="text-center text-xs opacity-75">
            (Practical Continued)
          </div>
        );
      }

      if (scheduleInfo.groups) {
        return (
          <div className="space-y-2 p-1">
            {Object.entries(scheduleInfo.groups).map(([group, info]) => (
              <div key={group} className="border-b last:border-0 border-gray-200/50 pb-2 last:pb-0">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <MdSubject className="flex-shrink-0 w-4 h-4" />
                  {info.subject}
                  <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full ml-1 font-medium">
                    {group}
                  </span>
                </div>
                <div className="text-xs opacity-75 flex items-center gap-1">
                  <MdPerson className="flex-shrink-0 w-3.5 h-3.5" />
                  {info.faculty}
                </div>
                <div className="text-xs flex items-center gap-1">
                  <MdRoom className="flex-shrink-0 w-3.5 h-3.5" />
                  {info.room}
                </div>
              </div>
            ))}
            <div className="text-xs text-center mt-1 font-medium text-gray-500">
              (2 Hour Practical)
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-1.5 p-1">
          <div className="font-bold flex items-center gap-1.5 text-sm">
            <MdSubject className="flex-shrink-0 w-4 h-4" />
            {scheduleInfo.subject}
            {scheduleInfo.group && (
              <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full ml-1 font-medium">
                {scheduleInfo.group}
              </span>
            )}
          </div>
          <div className="text-xs opacity-75 flex items-center gap-1">
            <MdPerson className="flex-shrink-0 w-3.5 h-3.5" />
            {scheduleInfo.faculty}
          </div>
          <div className="text-xs flex items-center gap-1">
            <MdRoom className="flex-shrink-0 w-3.5 h-3.5" />
            {scheduleInfo.room}
          </div>
          <div className="text-xs text-center mt-1 font-medium text-gray-500">
            (2 Hour Practical)
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-1.5 p-1">
        <div className="font-bold flex items-center gap-1.5 text-sm">
          <MdSubject className="flex-shrink-0 w-4 h-4" />
          {scheduleInfo.subject}
        </div>
        <div className="text-xs opacity-75 flex items-center gap-1">
          <MdPerson className="flex-shrink-0 w-3.5 h-3.5" />
          {scheduleInfo.faculty}
        </div>
        <div className="text-xs flex items-center gap-1">
          <MdRoom className="flex-shrink-0 w-3.5 h-3.5" />
          {scheduleInfo.room}
        </div>
      </div>
    );
  };

  // Mobile Card View
  const MobileView = () => (
    <div className="space-y-6 md:hidden">
      <div className="text-sm text-gray-500">
        {user?.department} - {user?.year} - Class {user?.className}
      </div>
      {days.map(day => (
        <div key={day.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 px-4 text-lg font-semibold sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 flex items-center justify-between">
            <span>{day.label}</span>
          </div>
          <div className="divide-y divide-gray-100">
            {timeSlots.map(time => {
              const scheduleInfo = getScheduleInfo(day.id, time);
              if (time === '12:15-1:00') {
                return (
                  <div key={`${day.id}-${time}`} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 text-center text-amber-800 font-medium">
                    LUNCH BREAK
                  </div>
                );
              }
              return (
                <div
                  key={`${day.id}-${time}`}
                  onClick={() => handleCellClick(day.id, time)}
                  className={`p-4 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-inner
                    ${scheduleInfo ? getRandomColor(scheduleInfo.subject, scheduleInfo.type) : 'hover:bg-gray-50'}`}
                >
                  <div className="text-sm font-medium mb-2 text-gray-700">
                    {time}
                  </div>
                  {scheduleInfo ? (
                    <CellContent scheduleInfo={scheduleInfo} />
                  ) : (
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">+</span>
                      Tap to add
                    </span>
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
    <div className="hidden md:block h-full overflow-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="text-sm text-gray-500">
          {user?.department} - {user?.year} - Class {user?.className}
        </div>
        <table className="w-full border-collapse table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-800 to-gray-700">
              <th className="p-4 text-white font-medium w-32 border-b border-gray-700">Time</th>
              {days.map(day => (
                <th key={day.id} className="p-4 text-white font-medium border-b border-gray-700 w-1/5">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {timeSlots.map(time => (
              <tr key={time} className="group">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50/80 sticky left-0 group-hover:bg-gray-100 transition-colors">
                  {time}
                </td>
                {days.map(day => {
                  if (time === '12:15-1:00') {
                    return (
                      <td 
                        key={`${day.id}-${time}`} 
                        className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 text-center text-amber-800 font-medium border-b border-amber-100" 
                        colSpan={5}
                      >
                        LUNCH BREAK
                      </td>
                    );
                  }
                  const scheduleInfo = getScheduleInfo(day.id, time);
                  return (
                    <td
                      key={`${day.id}-${time}`}
                      onClick={() => handleCellClick(day.id, time)}
                      className={`p-4 cursor-pointer transition-all duration-200 ease-in-out relative
                        group/cell hover:shadow-md hover:z-10
                        ${scheduleInfo ? getRandomColor(scheduleInfo.subject, scheduleInfo.type) : 'hover:bg-primary-50'}`}
                    >
                      {scheduleInfo ? (
                        <CellContent scheduleInfo={scheduleInfo} />
                      ) : (
                        <span className="text-gray-400 absolute inset-0 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity">
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">+</span>
                            Click to add
                          </span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const filteredTimetable = timetableData[selectedDay]?.filter(period =>
    period.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    period.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    period.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => setError(null)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 text-center">
            Class Timetable
          </h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            {window.innerWidth < 768 ? 'Tap any slot to add details' : 'Click any slot to add details'}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="h-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search subjects, teachers..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-800 focus:border-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Timetable
            </button>
          </div>
          <MobileView />
          <DesktopView />
          <div ref={componentRef}>
            {filteredTimetable?.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No classes found matching your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
                {filteredTimetable?.map((period) => (
                  <div
                    key={period.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-500">{period.time}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Room {period.room}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{period.subject}</h3>
                    <p className="text-sm text-gray-500">{period.teacher}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable; 