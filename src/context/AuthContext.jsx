import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user and isLoggedIn from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  // Update user function
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Check if the user is an admin
  const isAdmin = () => {
    return user?.role === 'Admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);