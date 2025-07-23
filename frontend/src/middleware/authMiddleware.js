export const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('lawyer_token');
      localStorage.removeItem('lawyer');
      throw new Error('Authentication failed');
    }
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}; 