import React, { useState } from 'react';
import './Timetable.css';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const [schedule, setSchedule] = useState({});

  const handleCellClick = (day, time) => {
    const key = `${day}-${time}`;
    const subject = prompt('Enter subject name:');
    if (subject) {
      setSchedule(prev => ({
        ...prev,
        [key]: subject
      }));
    }
  };

  return (
    <div className="timetable-container">
      <h1 className="timetable-title">Class Timetable</h1>
      <div className="timetable">
        <div className="header-row">
          <div className="header-cell time-header">Time</div>
          {days.map(day => (
            <div key={day} className="header-cell">
              {day}
            </div>
          ))}
        </div>
        {timeSlots.map(time => (
          <div key={time} className="time-row">
            <div className="time-cell">{time}</div>
            {days.map(day => (
              <div
                key={`${day}-${time}`}
                className="schedule-cell"
                onClick={() => handleCellClick(day, time)}
              >
                {schedule[`${day}-${time}`] || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable; 