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
      console.log('Registering user:', userData);
      const { confirmPassword, ...userDetails } = userData;
      
      const newUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        displayName: `${userData.firstName} ${userData.lastName}`,
        ...userDetails,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock_token_' + Math.random().toString(36).substr(2, 9));
      
      setCurrentUser(newUser);
      console.log('User registered successfully:', newUser);

      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login with email:', email);
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('User not found');
      }

      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        setCurrentUser(user);
        console.log('Login successful:', user);
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    console.log('Logging out user:', currentUser);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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