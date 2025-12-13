import axios from 'axios';
import { refreshToken } from '../services/authService';
import { getSessionToken } from '../services/sessionService';

const API_URL = 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // <-- Add this line
});

axiosInstance.interceptors.request.use(
  (config) => {
    const sessionTrackingEndpoints = [
      '/sessions/viewed-products',
      '/stats/track-add-to-cart',
    ];

    if (sessionTrackingEndpoints.includes(config.url)) {
      const sessionToken = getSessionToken();
      if (sessionToken) {
        config.headers['Authorization'] = 'Bearer ' + sessionToken;
      }
    } else if (!config.headers['Authorization']) {
      // For other endpoints, use the default behavior
      // which should be handled by the UserContext
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh-token') {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
        window.location.href = '/login'; // Force a full redirect to clear state
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;