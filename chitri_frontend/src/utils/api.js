// chitri_frontend/src/utils/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// UPDATED: Interceptor to only attach Authorization header if a valid token string exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // Only attach Authorization header if token exists and is a non-empty string
    if (token && typeof token === 'string' && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token, ensure Authorization header is explicitly removed
      // This prevents sending "Authorization: Bearer null" or "Bearer undefined"
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
