import React from 'react';

const WeeklyView = ({ timetableData }) => {
  const timeSlots = ['9:00', '10:00', '11:15', '1:00'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <div className="grid grid-cols-6 gap-px bg-gray-200 dark:bg-gray-700">
          {/* Time column */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4">
            <div className="font-medium text-gray-900 dark:text-gray-100">Time</div>
          </div>
          
          {/* Days columns */}
          {days.map((day) => (
            <div key={day} className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {day}
              </div>
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              <div className="bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700">
                <div className="text-sm text-gray-900 dark:text-gray-100">{time}</div>
              </div>
              {days.map((day) => (
                <div key={`${day}-${time}`} className="bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700">
                  {timetableData[day]?.find(
                    (period) => period.time.startsWith(time)
                  ) && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {timetableData[day].find((period) => period.time.startsWith(time)).subject}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Room {timetableData[day].find((period) => period.time.startsWith(time)).room}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyView; 