import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const appointmentService = {
  getAppointments: async (params) => {
    try {
      const response = await axios.get(`${API_URL}/lawyer/appointments`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAppointmentStatus: async (appointmentId, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/lawyer/appointments/${appointmentId}`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAppointmentDetails: async (appointmentId) => {
    try {
      const response = await axios.get(`${API_URL}/lawyer/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 