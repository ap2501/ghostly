import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null); // Add username state

  // Update login function to handle username
  const login = (userToken, userName) => {
    setToken(userToken);
    setUsername(userName); // Set username
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUsername(null); // Clear username on logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
