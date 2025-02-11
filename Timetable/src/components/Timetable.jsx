import React, { useState } from 'react';
// Import icons from react-icons
import { MdPerson, MdRoom, MdGroup, MdSubject } from 'react-icons/md';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
      {days.map(day => (
        <div key={day} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 px-4 text-lg font-semibold sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 flex items-center justify-between">
            <span>{day}</span>
          </div>
          <div className="divide-y divide-gray-100">
            {timeSlots.map(time => {
              const scheduleInfo = getScheduleInfo(day, time);
              if (time === '12:15-1:00') {
                return (
                  <div key={`${day}-${time}`} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 text-center text-amber-800 font-medium">
                    LUNCH BREAK
                  </div>
                );
              }
              return (
                <div
                  key={`${day}-${time}`}
                  onClick={() => handleCellClick(day, time)}
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
        <table className="w-full border-collapse table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-800 to-gray-700">
              <th className="p-4 text-white font-medium w-32 border-b border-gray-700">Time</th>
              {days.map(day => (
                <th key={day} className="p-4 text-white font-medium border-b border-gray-700 w-1/5">
                  {day}
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
                        key={`${day}-${time}`} 
                        className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 text-center text-amber-800 font-medium border-b border-amber-100" 
                        colSpan={5}
                      >
                        LUNCH BREAK
                      </td>
                    );
                  }
                  const scheduleInfo = getScheduleInfo(day, time);
                  return (
                    <td
                      key={`${day}-${time}`}
                      onClick={() => handleCellClick(day, time)}
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
          <MobileView />
          <DesktopView />
        </div>
      </div>
    </div>
  );
};

export default Timetable; 