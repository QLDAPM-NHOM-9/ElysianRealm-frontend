import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  /**
   * Initialize user from token when component mounts
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          setToken(storedToken);
          // Try to fetch current user info
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser.user || currentUser);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token: newToken, user: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      return { token: newToken, user: userData };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register new user
   * @param {Object} userData
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  /**
   * Check if user has specific role
   * @param {string} role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user is admin
   */
  const isAdmin = () => {
    return user?.role === 'ADMIN' || user?.role === 'admin';
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        hasRole,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};