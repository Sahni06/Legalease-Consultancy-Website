import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;  // Changed from process.env to import.meta.env

export const lawyerAuthService = {
  signup: async (data) => {
    try {
      // Add /api prefix to match backend route
      const response = await axios.post(`${API_URL}/api/lawyer/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      // Remove duplicate /api from URL
      const response = await axios.post(`${API_URL}/lawyer/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success && response.data.token) {
        // Remove duplicate Bearer prefix
        localStorage.setItem('lawyer_token', response.data.token);
        localStorage.setItem('lawyer', JSON.stringify(response.data.lawyer));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error('Network error - Please check if the server is running');
      } else {
        throw error;
      }
    }
  },

  verifyOTP: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/lawyer/verify-otp`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('lawyer_token');
    localStorage.removeItem('lawyer');
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('lawyer_token');
      if (!token) {
        throw new Error('No token found');
      }

      // Remove duplicate /api prefix
      const response = await axios.get(`${API_URL}/lawyer/verify-token`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Token verification response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Token verification failed');
      }

      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error.response?.data || error;
    }
  },

  updateProfile: async (data) => {
    try {
      const token = localStorage.getItem('lawyer_token');
      const response = await axios.put(`${API_URL}/api/lawyer/profile/update`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};