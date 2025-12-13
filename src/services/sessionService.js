import axios from '../api/axios';

const SESSION_TOKEN_KEY = 'sessionToken';

export const getSessionToken = () => {
  return localStorage.getItem(SESSION_TOKEN_KEY);
};

export const initializeSession = async () => {
  let sessionToken = getSessionToken();

  if (!sessionToken) {
    try {
      const response = await axios.post('/sessions', {
        deviceInfo: {
          userAgent: navigator.userAgent,
        },
        referrer: document.referrer,
      });
      sessionToken = response.data.refreshToken;
      localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  }
};

export const trackProductView = async (productId) => {
  console.log('Tracking product view for productId:', productId);
  const sessionToken = getSessionToken();
  if (!sessionToken) {
    console.warn('No session found, cannot track product view.');
    return;
  }

  try {
    await axios.patch('/sessions/viewed-products', {
      productId,
    });
  } catch (error) {
    console.error('Failed to track product view:', error);
  }
};
