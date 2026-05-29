import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth session on startup
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      if (token.startsWith('simulated_')) {
        // Load simulated offline session immediately
        const savedName = localStorage.getItem('simulated_name') || 'Admin User';
        const savedEmail = localStorage.getItem('simulated_email') || 'admin@geary.com';
        setUser({ name: savedName, email: savedEmail, isOfflineSimulated: true });
        setLoading(false);
      } else {
        // Query Laravel backend API
        api.get('/user')
          .then((response) => {
            if (response.data && response.data.user) {
              setUser(response.data.user);
            } else {
              localStorage.removeItem('auth_token');
            }
          })
          .catch((error) => {
            console.warn("Backend auth query failed. Clearing token.", error);
            localStorage.removeItem('auth_token');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Login request failed:", error);
      
      // Check if it's a network offline error
      const isOffline = !error.response || error.code === 'ERR_NETWORK';
      const message = error.response?.data?.message || 'Login failed. Connection refused.';
      const errors = error.response?.data?.errors || null;
      
      return { success: false, offline: isOffline, message, errors };
    }
  };

  // Register handler
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/register', { name, email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Registration request failed:", error);
      
      const isOffline = !error.response || error.code === 'ERR_NETWORK';
      const message = error.response?.data?.message || 'Registration failed. Connection refused.';
      const errors = error.response?.data?.errors || null;
      
      return { success: false, offline: isOffline, message, errors };
    }
  };

  // Offline Simulation Login Bypass
  const loginOffline = (name, email) => {
    const simToken = 'simulated_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('auth_token', simToken);
    localStorage.setItem('simulated_name', name);
    localStorage.setItem('simulated_email', email);
    
    const simulatedUser = { name, email, isOfflineSimulated: true };
    setUser(simulatedUser);
    return { success: true, simulated: true };
  };

  // Logout handler
  const logout = async () => {
    const token = localStorage.getItem('auth_token');
    if (token && !token.startsWith('simulated_')) {
      try {
        await api.post('/logout');
      } catch (error) {
        console.warn("Logout request to backend failed:", error);
      }
    }
    
    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('simulated_name');
    localStorage.removeItem('simulated_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginOffline, logout }}>
      {children}
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
