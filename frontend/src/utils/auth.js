export const clearAuthData = () => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user');
  localStorage.removeItem('lawyer_token');
  localStorage.removeItem('lawyer');
  sessionStorage.removeItem('pendingConsultation');
};

export const getAuthToken = (type = 'user') => {
  return localStorage.getItem(`${type}_token`);
};

export const setAuthData = (type, data, token) => {
  localStorage.setItem(`${type}_token`, token);
  localStorage.setItem(type, JSON.stringify(data));
};

export const checkTokenExpiry = () => {
  const lawyerData = localStorage.getItem('lawyer');
  if (lawyerData) {
    const data = JSON.parse(lawyerData);
    if (data.expiryTime && new Date().getTime() > data.expiryTime) {
      clearAuthData();
      return false;
    }
    return true;
  }
  return false;
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem('lawyer_token');
    if (!token) return false;

    const response = await fetch(`${API_URL}/lawyer/refresh-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    localStorage.setItem('lawyer_token', data.token);
    const lawyerData = JSON.parse(localStorage.getItem('lawyer'));
    localStorage.setItem('lawyer', JSON.stringify({
      ...lawyerData,
      token: data.token,
      expiryTime
    }));

    return true;
  } catch (error) {
    clearAuthData();
    return false;
  }
};
