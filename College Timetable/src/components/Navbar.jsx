import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { 
  UserCircleIcon, 
  CalendarIcon, 
  AcademicCapIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors">
              <CalendarIcon className="h-5 w-5" />
              <span className="text-lg font-semibold">College Timetable</span>
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors">
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="text-sm">{user.email}</span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 space-x-2`}
                        >
                          <AcademicCapIcon className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700 space-x-2`}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm text-white hover:text-blue-100 transition-colors px-3 py-1.5 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-white text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar