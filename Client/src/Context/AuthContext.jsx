import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // On app load, restore auth state from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userToken, userName) => {
    setToken(userToken);
    setUsername(userName);
    setIsAuthenticated(true);

    // Store in localStorage
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setIsAuthenticated(false);

    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
