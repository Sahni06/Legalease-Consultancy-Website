import env from '@/config/env.config';

export const apiService = {
  async get(endpoint) {
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  },

  async post(endpoint, data) {
    const response = await fetch(`${env.API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  },

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const token = localStorage.getItem('lawyer_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },

  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  }
}; 