import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { logout as logoutService } from '../services/authService';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // This effect will run when the token changes.
    // It sets the default Authorization header for all axios requests.
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = async () => {
    await logoutService();
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};