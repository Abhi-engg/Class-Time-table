import  { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

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
      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Remove confirmPassword from userData
      const { confirmPassword, ...userDetails } = userData;
      
      // Validate required fields
      if (!userDetails.email || !userDetails.password) {
        throw new Error('Email and password are required');
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find(user => user.email === userDetails.email)) {
        throw new Error('User with this email already exists');
      }

      // Create user object with required auth fields
      const newUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userDetails.email.toLowerCase(),
        password: userDetails.password, // In real app, hash password
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

      // Set current user
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      
      return userWithoutPassword;

    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

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