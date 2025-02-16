import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  // Navigation items
  const mainNavItems = [
    { path: '/dashboard/daily', label: 'Daily View' },
    { path: '/dashboard/weekly', label: 'Weekly View' },
    { path: '/dashboard/calendar', label: 'Calendar' },
  ];

  const resourceItems = [
    { path: '/dashboard/materials', label: 'Study Materials' },
    { path: '/dashboard/assignments', label: 'Assignments' },
    { path: '/dashboard/exams', label: 'Exam Schedule' },
    { path: '/dashboard/faculty', label: 'Faculty Directory' },
  ];

  const profileItems = [
    { path: '/dashboard/profile', label: 'Profile Settings' },
    { path: '/dashboard/notifications', label: 'Notifications' },
    { path: '/dashboard/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavLink to="/dashboard" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mr-2"
              >
                <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                TimeTable
              </span>
            </NavLink>
          </motion.div>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main Nav Items */}
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsResourcesOpen(!isResourcesOpen);
                  setIsProfileOpen(false);
                }}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center"
              >
                <span>Resources</span>
                <motion.svg
                  animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {resourceItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors
                            ${isActive ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : ''}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsResourcesOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  {currentUser?.profileImage ? (
                    <img 
                      src={currentUser.profileImage} 
                      alt={currentUser?.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {currentUser?.name?.[0] || currentUser?.email?.[0] || '?'}
                    </span>
                  )}
                </div>
                <span className="hidden md:block">{currentUser?.name || 'User'}</span>
                <motion.svg
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    {/* User Profile Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          {currentUser?.profileImage ? (
                            <img 
                              src={currentUser.profileImage} 
                              alt={currentUser?.name} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl text-indigo-600 dark:text-indigo-400 font-medium">
                              {currentUser?.name?.[0] || currentUser?.email?.[0] || '?'}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {currentUser?.name || 'Guest User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {currentUser?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Department</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentUser?.department || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Year</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentUser?.year || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Roll Number</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentUser?.rollNumber || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Class</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentUser?.className || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Attendance</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentUser?.attendance || '0'}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Assignments</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentUser?.completedAssignments || '0'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Events</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentUser?.upcomingEvents || '0'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-2">
                      {profileItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors
                            ${isActive ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : ''}`
                          }
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </NavLink>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 