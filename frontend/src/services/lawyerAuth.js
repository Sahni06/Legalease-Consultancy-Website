import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginLawyer = async (credentials) => {
  try {
    console.log('Attempting login with: ', credentials);
    const response = await axios.post(`${API_URL}/lawyer/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error: ', error);
    throw error;
  }
}; 