import { useState } from 'react'
import { format, addDays, startOfWeek } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

function Timetable() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8)
  const weekDays = Array.from({ length: 5 }, (_, i) => 
    format(addDays(startOfWeek(currentDate), i + 1), 'EEEE')
  )

  const schedule = {
    Monday: {
      9: { subject: 'Mathematics', room: 'Room 101', professor: 'Dr. Smith', color: 'bg-blue-100 border-blue-300' },
      11: { subject: 'Physics', room: 'Lab 201', professor: 'Dr. Johnson', color: 'bg-green-100 border-green-300' },
    },
    // Add more schedules
  }

  const handlePreviousWeek = () => {
    setCurrentDate(date => addDays(date, -7))
  }

  const handleNextWeek = () => {
    setCurrentDate(date => addDays(date, 7))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Class Schedule
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 gap-2 min-w-[800px]">
          <div className="sticky left-0 bg-white">
            <div className="h-12"></div>
            {timeSlots.map(time => (
              <div key={time} className="h-20 border flex items-center justify-center text-sm text-gray-600">
                {format(new Date().setHours(time), 'h:mm a')}
              </div>
            ))}
          </div>

          {weekDays.map(day => (
            <div key={day} className="flex-1">
              <div className="h-12 border bg-gray-50 flex items-center justify-center font-semibold text-gray-700">
                {day}
              </div>
              {timeSlots.map(time => {
                const classInfo = schedule[day]?.[time]
                return (
                  <div key={`${day}-${time}`} className="h-20 border p-1">
                    {classInfo && (
                      <div className={`h-full rounded-md border ${classInfo.color} p-2 overflow-hidden`}>
                        <div className="font-medium text-sm">{classInfo.subject}</div>
                        <div className="text-xs text-gray-600">{classInfo.room}</div>
                        <div className="text-xs text-gray-600">{classInfo.professor}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timetable