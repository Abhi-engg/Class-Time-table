import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { rollNumber, department, year, className } = currentUser || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Close dropdowns on route change
  useEffect(() => {
    closeAllDropdowns();
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownClick = event.target.closest('.dropdown-trigger');
      const isDropdownContent = event.target.closest('.dropdown-content');
      
      if (!isDropdownClick && !isDropdownContent) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setIsProfileOpen(false);
    setIsResourcesOpen(false);
  };

  const handleDropdownClick = (dropdownType) => {
    if (dropdownType === 'profile') {
      setIsProfileOpen(!isProfileOpen);
      setIsResourcesOpen(false);
    } else if (dropdownType === 'resources') {
      setIsResourcesOpen(!isResourcesOpen);
      setIsProfileOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeAllDropdowns();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  // Updated navigation items
  const mainNavItems = [
    { path: '/dashboard/daily', label: 'Daily View' },
    { path: '/dashboard/weekly', label: 'Weekly View' },
    { path: '/dashboard/calendar', label: 'Calendar' },
    { path: '/dashboard/exams', label: 'Exam Schedule' }
  ];

  const resourceItems = [
    { path: '/dashboard/materials', label: 'Study Materials' },
    { path: '/dashboard/assignments', label: 'Assignments' },
    { path: '/dashboard/faculty', label: 'Faculty Directory' },
  ];

  const profileItems = [
    { path: '/dashboard/profile', label: 'Profile Settings' },
    { path: '/dashboard/notifications', label: 'Notifications' },
    { path: '/dashboard/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg fixed w-full top-0 left-0 z-50">
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
                onClick={closeAllDropdowns}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
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
                className="dropdown-trigger px-3 py-2 rounded-lg text-sm font-medium text-gray-600 
                         dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 
                         transition-all duration-200 flex items-center"
                onClick={() => handleDropdownClick('resources')}
              >
                <span>Resources</span>
                <motion.svg
                  animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
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
                    className="dropdown-content absolute right-0 mt-2 w-48 rounded-lg shadow-lg 
                             bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                             border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="py-1">
                      {resourceItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm
                            ${isActive 
                              ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                            }
                            transition-colors`
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
                className="dropdown-trigger flex items-center space-x-2 px-3 py-2 rounded-lg 
                         text-sm font-medium text-gray-600 dark:text-gray-300 
                         hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200"
                onClick={() => handleDropdownClick('profile')}
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
                    className="dropdown-content absolute right-0 mt-2 w-80 rounded-lg shadow-lg 
                             bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                             border border-gray-200/50 dark:border-gray-700/50"
                  >
                    {/* User Header Info */}
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                            {currentUser?.profileImage ? (
                              <img 
                                src={currentUser.profileImage} 
                                alt={currentUser?.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl text-indigo-600 dark:text-indigo-400 font-medium">
                                {currentUser?.name?.[0] || currentUser?.email?.[0] || '?'}
                              </span>
                            )}
                          </div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {currentUser?.name || 'Guest User'}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {currentUser?.email || 'No email'}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                              Roll No: {rollNumber || 'N/A'}
                            </span>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                              Class: {className || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Academic Info */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Department</p>
                          <p className="text-gray-900 dark:text-white font-medium truncate">
                            {department || 'Not Set'}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Year</p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {year || 'Not Set'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Classes</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.classesCount || '0'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assignments</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.assignmentsCount || '0'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentUser?.attendancePercentage || '0'}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {profileItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm
                            ${isActive 
                              ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                            }
                            transition-colors`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 
                                 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      >
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