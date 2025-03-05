import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    year: '',
    className: '',
    rollNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Add validation state
  const [validationErrors, setValidationErrors] = useState({});
  
  // Smart defaults based on common patterns
  const departmentOptions = [
    { value: 'Comps', label: 'Computer Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AIML', label: 'AI & ML' },
    { value: 'Data', label: 'Data Engineering' },
    { value: 'civil', label: 'Civil Engineering'}
  ];

  const yearOptions = [
    { value: 'FE', label: 'First Year' },
    { value: 'SE', label: 'Second Year' },
    { value: 'TE', label: 'Third Year' },
    { value: 'BE', label: 'Fourth Year' }
  ];
 
  // Dynamic class options based on department
  const getClassOptions = (dept) => {
    const baseOptions = ['A', 'B', 'C','D'];
    if (dept === 'Comps' || dept === 'IT') {
      return [...baseOptions, 'D'].map(div => ({
        value: div,
        label: `Division ${div}`
      }));
    }
    return baseOptions.map(div => ({
      value: div,
      label: `Division ${div}`
    }));
  };

  // Auto-generate email based on roll number
  // useEffect(() => {
  //   if (formData.rollNumber && formData.department) {
  //     const autoEmail = `${formData.rollNumber.toLowerCase()}@universal.edu.in`;
  //     setFormData(prev => ({ ...prev, email: autoEmail }));
  //   }
  // }, [formData.rollNumber, formData.department]);

  // Simplified email generation
  const generateEmail = (firstName, lastName) => {
    if (!firstName) return '';
    const name = firstName.toLowerCase();
    const surname = lastName ? lastName.toLowerCase() : '';
    
    return `${name}.${surname}@universal.edu.in`;
  };

  // Validation rules
  const validateStep = (stepNumber) => {
    const errors = {};
    
    switch(stepNumber) {
      case 1:
        if (!formData.firstName.trim()) 
          errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) 
          errors.lastName = 'Last name is required';
        if (!formData.department) 
          errors.department = 'Department is required';
        if (!formData.year) 
          errors.year = 'Year is required';
        break;
        
      case 2:
        if (!formData.className) 
          errors.className = 'Class is required';
        if (!formData.rollNumber) 
          errors.rollNumber = 'Roll number is required';
        if (!formData.email) 
          errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          errors.email = 'Invalid email format';
        break;
        
      case 3:
        if (!formData.password) 
          errors.password = 'Password is required';
        else if (formData.password.length < 8)
          errors.password = 'Password must be at least 8 characters';
        else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password))
          errors.password = 'Password must include numbers and symbols';
        if (!formData.confirmPassword) 
          errors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword)
          errors.confirmPassword = 'Passwords do not match';
        break;
        
      default:
        break;
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate current step
    const errors = validateStep(step);
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      // Show error animation or notification
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // 1. Primary Storage: Database (through register function)
      const userData = {
        ...formData,
        email: formData.email.toLowerCase(),
        rollNumber: formData.rollNumber.toUpperCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        role: 'student',
        academicDetails: {
          department: formData.department,
          year: formData.year,
          className: formData.className,
          rollNumber: formData.rollNumber
        },
        personalDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email
        }
      };

      // This sends data to your backend database
      await register(userData);
      
      // 2. Local Storage: Browser
      localStorage.setItem('userDetails', JSON.stringify({
        name: userData.personalDetails.fullName,
        email: userData.email,
        department: userData.academicDetails.department,
        year: userData.academicDetails.year
      }));

      navigate('/dashboard/daily');
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({ 
                    ...prev, 
                    firstName: value,
                    email: generateEmail(value, formData.lastName)
                  }));
                }}
                placeholder="Enter your first name"
                error={validationErrors.firstName}
                className="bg-[#0A192F] border-[#233554] text-white"
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({ 
                    ...prev, 
                    lastName: value,
                    email: generateEmail(formData.firstName, value)
                  }));
                }}
                placeholder="Enter your last name"
                className="bg-[#0A192F] border-[#233554] text-white"
              />
            </div>
            <Select
              label="Department"
              options={departmentOptions}
              value={formData.department}
              onChange={(value) => {
                setFormData(prev => ({ 
                  ...prev, 
                  department: value,
                  className: ''
                }));
              }}
              placeholder="Select Your Department"
              className="bg-[#0A192F] border-[#233554] text-white"
            />
            <Select
              label="Year"
              options={yearOptions}
              value={formData.year}
              onChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
              placeholder="Select Your Year"
              className="bg-[#0A192F] border-[#233554] text-white"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Select
              label="Class"
              options={getClassOptions(formData.department)}
              value={formData.className}
              onChange={(value) => setFormData(prev => ({ ...prev, className: value }))}
              placeholder="Select Your Division"
              disabled={!formData.department}
              className="bg-[#0A192F] border-[#233554] text-white"
            />
            <Input
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setFormData(prev => ({ ...prev, rollNumber: value }));
              }}
              placeholder="Enter your roll number (e.g., 101)"
              className="bg-[#0A192F] border-[#233554] text-white"
            />
            <div className="space-y-2">
              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Your email will be generated automatically"
                className="bg-[#0A192F] border-[#233554] text-white"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-gray-400">
                  Auto-generated based on your name
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    email: generateEmail(formData.firstName, formData.lastName)
                  }))}
                  className="text-xs text-[#64FFDA] hover:text-[#64FFDA]/80 transition-colors"
                >
                  Reset to suggested email
                </button>
              </motion.div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Create a strong password"
                className="bg-[#0A192F] border-[#233554] text-white"
              />
              <div className="text-xs text-gray-400">
                Password must be at least 8 characters long and include numbers and symbols
              </div>
            </div>
            <Input
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm your password"
              error={validationErrors.confirmPassword}
              className="bg-[#0A192F] border-[#233554] text-white"
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="space-y-6 p-7 py-13 bg-[#112240] border border-[#233554] shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Step {step} of 3
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="flex-1 flex items-center">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <motion.div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        stepNumber <= step ? 'bg-[#64FFDA]' : 'bg-[#233554]'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => stepNumber < step && setStep(stepNumber)}
                    >
                      <span className={`text-xs ${
                        stepNumber <= step ? 'text-[#0A192F]' : 'text-white'
                      }`}>
                        {stepNumber}
                      </span>
                    </motion.div>
                    {stepNumber < 3 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        stepNumber < step ? 'bg-[#64FFDA]' : 'bg-[#233554]'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 text-sm text-red-500 bg-red-100/10 rounded-lg"
              >
                {error}
              </motion.div>
            )}
            
            <AnimatePresence mode='wait'>
              {renderStepContent()}
            </AnimatePresence>

            <div className="flex justify-between gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                className={`flex-1 bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 ${loading ? 'opacity-70' : ''}`}
                isLoading={loading}
              >
                {step === 3 ? 'Create Account' : 'Next'}
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-[#64FFDA] hover:text-[#64FFDA]/80 transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register; 