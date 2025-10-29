import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTimestamp = localStorage.getItem('userTimestamp');
    
    if (savedUser && savedTimestamp) {
      const now = Date.now();
      const sessionDuration = 1 * 60 * 60 * 1000; // 1 hours in milliseconds
      
      // Check if session is still valid (less than 24 hours old)
      if (now - parseInt(savedTimestamp) < sessionDuration) {
        setUser(JSON.parse(savedUser));
      } else {
        // Session expired, clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('userTimestamp');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userTimestamp', Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userTimestamp');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);