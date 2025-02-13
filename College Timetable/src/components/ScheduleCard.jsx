import { 
  AcademicCapIcon, 
  UserIcon, 
  ClockIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline'

function ScheduleCard({ classInfo }) {
  const { subject, room, professor, startTime, endTime, color = 'bg-blue-100' } = classInfo

  return (
    <div className="schedule-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className={`${color} px-4 py-3 border-b flex items-center space-x-2`}>
        <AcademicCapIcon className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-800">{subject}</h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center text-gray-600 text-xs">
          <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{room}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs">
          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{professor}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs">
          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{startTime} - {endTime}</span>
        </div>
      </div>
    </div>
  )
}

export default ScheduleCard