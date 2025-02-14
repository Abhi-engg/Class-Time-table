import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const { confirmPassword, ...userDetails } = userData;
      
      // Create a comprehensive user object
      const newUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        department: userData.department,
        year: userData.year,
        className: userData.className,
        rollNumber: userData.rollNumber,
        
        // Academic Details
        semester: getSemesterFromYear(userData.year),
        attendance: Math.floor(Math.random() * 20) + 80, // 80-100%
        completedAssignments: Math.floor(Math.random() * 15),
        upcomingEvents: Math.floor(Math.random() * 5),
        cgpa: (Math.random() * 2 + 8).toFixed(2), // 8.00-10.00
        
        // Course Information
        currentSubjects: getSubjectsForDepartment(userData.department),
        facultyAdvisor: getFacultyAdvisor(userData.department),
        
        // System Info
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        accountStatus: 'active',
        
        ...userDetails
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('User not found');

      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        const updatedUser = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Helper Functions
  const getSemesterFromYear = (year) => {
    const semesterMap = {
      'FE': '1st & 2nd',
      'SE': '3rd & 4th',
      'TE': '5th & 6th',
      'BE': '7th & 8th'
    };
    return semesterMap[year] || '1st';
  };

  const getSubjectsForDepartment = (dept) => {
    const subjects = {
      'Comps': [
        { name: 'Data Structures', faculty: 'Dr. Smith', code: 'CS101' },
        { name: 'Database Systems', faculty: 'Prof. Johnson', code: 'CS102' },
        { name: 'Computer Networks', faculty: 'Dr. Williams', code: 'CS103' }
      ],
      'IT': [
        { name: 'Web Development', faculty: 'Prof. Davis', code: 'IT101' },
        { name: 'Cloud Computing', faculty: 'Dr. Miller', code: 'IT102' },
        { name: 'Information Security', faculty: 'Prof. Wilson', code: 'IT103' }
      ],
      'AIML': [
        { name: 'Machine Learning', faculty: 'Dr. Brown', code: 'AI101' },
        { name: 'Neural Networks', faculty: 'Prof. Taylor', code: 'AI102' },
        { name: 'Data Mining', faculty: 'Dr. Anderson', code: 'AI103' }
      ]
    };
    return subjects[dept] || [];
  };

  const getFacultyAdvisor = (dept) => {
    const advisors = {
      'Comps': 'Dr. Robert Smith',
      'IT': 'Prof. Sarah Johnson',
      'AIML': 'Dr. Michael Brown'
    };
    return advisors[dept] || 'To be assigned';
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;