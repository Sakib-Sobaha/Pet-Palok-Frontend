// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  const login = (type, userData) => {
    setUserType({ type, ...userData });
  };

  const logout = () => {
    setUserType(null);
  };

  return (
    <UserContext.Provider value={{ userType, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
