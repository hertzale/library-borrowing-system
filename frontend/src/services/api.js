import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT (stored under "authToken") to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is rejected, clear the session and go to /login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthCall = url.includes('/auth/login') || url.includes('/auth/register');

    if (status === 401 && !isAuthCall) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authStudent');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Turns an axios error into a readable message
export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  const data = error.response?.data;
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    return `${data.message}: ${data.errors.join(', ')}`;
  }
  if (data?.message) return data.message;
  if (error.request) return 'Cannot reach the server. Is the backend running?';
  return fallback;
};

export default api;
