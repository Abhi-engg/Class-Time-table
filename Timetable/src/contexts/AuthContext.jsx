import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async ({ email, password }) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: '1',
        email,
        department: 'Computer Science',
        year: '3rd Year',
        className: 'CS-A',
        rollNumber: 'CS2021001'
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const newUser = {
        id: Date.now().toString(),
        ...userData
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 