import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to restore user session from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Remove confirmPassword from userData
      const { confirmPassword, ...userDetails } = userData;
      
      // Validate required fields
      const requiredFields = ['email', 'password', 'firstName', 'lastName', 'department', 'year', 'className', 'rollNumber'];
      const missingFields = requiredFields.filter(field => !userDetails[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userDetails.email)) {
        throw new Error('Invalid email format');
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find(user => user.email.toLowerCase() === userDetails.email.toLowerCase())) {
        throw new Error('User with this email already exists');
      }

      // Create user object with required auth fields
      const newUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userDetails.email.toLowerCase(),
        password: userDetails.password, // In production, use proper password hashing
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        department: userDetails.department,
        year: userDetails.year,
        className: userDetails.className,
        rollNumber: userDetails.rollNumber,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        accountStatus: 'active'
      };

      // Store in users array
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Set current user (without password)
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;

    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Get users from storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find matching user
      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (user.accountStatus !== 'active') {
        throw new Error('Account is not active');
      }

      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };

      // Update in storage
      const updatedUsers = users.map(u => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return userWithoutPassword;

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = async (userId, updates) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user data
      const updatedUser = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      // Update current user if it's the same user
      if (currentUser?.id === userId) {
        const { password, ...userWithoutPassword } = updatedUser;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }

      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    register,
    login, 
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;