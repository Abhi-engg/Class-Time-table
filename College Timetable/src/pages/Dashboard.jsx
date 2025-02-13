import { useState } from 'react'
import Timetable from '../components/Timetable'
import { AcademicCapIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline'

function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSection, setSelectedSection] = useState('')

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil']
  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
  const sections = ['A', 'B', 'C']

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and view your class schedules
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Department</h3>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpenIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Year</h3>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Section</h3>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <Timetable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard 