import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    className: '',
    rollNumber: ''
  });

  // Predefined options for dropdowns
  const departmentOptions = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Electrical",
    "Mechanical",
    "Civil",
    "Chemical",
    "Biotechnology"
  ];

  const yearOptions = [
    "First Year",
    "Second Year",
    "Third Year",
    "Final Year"
  ];

  const classOptions = {
    "Computer Science": ["CS-A", "CS-B", "CS-C"],
    "Information Technology": ["IT-A", "IT-B"],
    "Electronics": ["EC-A", "EC-B"],
    "Electrical": ["EE-A", "EE-B"],
    "Mechanical": ["ME-A", "ME-B"],
    "Civil": ["CE-A", "CE-B"],
    "Chemical": ["CH-A", "CH-B"],
    "Biotechnology": ["BT-A", "BT-B"]
  };

  // Animation variants for dropdowns
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  // Custom Dropdown Component
  const CustomSelect = ({ label, name, options, value, onChange, disabled = false, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full px-4 py-3 text-left flex items-center justify-between
              bg-gray-50 dark:bg-gray-700 
              border-2 border-gray-300 dark:border-gray-600 
              rounded-lg text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500 cursor-pointer'}
              ${isOpen ? 'ring-2 ring-indigo-500 border-transparent' : ''}
            `}
          >
            <span className={`block truncate ${!value ? 'text-gray-500 dark:text-gray-400' : ''}`}>
              {value || placeholder}
            </span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="max-h-60 overflow-auto custom-scrollbar">
                  {options.map((option, index) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onChange({ target: { name, value: option } });
                        setIsOpen(false);
                      }}
                      className={`
                        px-4 py-2 cursor-pointer flex items-center
                        ${value === option ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-300'}
                        hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                        transition-colors duration-150
                      `}
                    >
                      {value === option && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                      {option}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
  };

  // Add this CSS to your global styles or component
  const customScrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgba(156, 163, 175, 0.7);
    }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Reset className when department changes
      if (name === 'department') {
        newData.className = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Submitting form data:', formData);
      if (!formData.department || !formData.year || !formData.className || !formData.rollNumber) {
        throw new Error('All fields are required');
      }
      await login(formData);
      navigate('/dashboard/daily');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{customScrollbarStyles}</style>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 w-full h-64 bg-indigo-600 dark:bg-indigo-900 transform -skew-y-6 z-0"></div>
        
        <div className="max-w-md w-full space-y-8 relative z-10">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Please sign in to access your timetable
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Department Dropdown */}
                <CustomSelect
                  label="Department"
                  name="department"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Select Department"
                />

                {/* Year Dropdown */}
                <CustomSelect
                  label="Year"
                  name="year"
                  options={yearOptions}
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Select Year"
                />

                {/* Class Dropdown */}
                <CustomSelect
                  label="Class"
                  name="className"
                  options={formData.department ? classOptions[formData.department] : []}
                  value={formData.className}
                  onChange={handleChange}
                  disabled={!formData.department}
                  placeholder="Select Class"
                />

                {/* Roll Number Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Roll Number
                  </label>
                  <input
                    name="rollNumber"
                    type="text"
                    required
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your roll number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 