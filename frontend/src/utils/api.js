import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  LAWYER: {
    VERIFY_TOKEN: '/lawyer/verify-token',
    PROFILE: '/lawyer/profile',
    CLIENTS: '/lawyer/clients'
  }
};

export const handleApiError = (error) => {
  if (error.message === 'Failed to fetch') {
    return 'Server is not responding. Please check your connection and try again.';
  }
  return error.message || 'Something went wrong';
};
