const fetchStats = async () => {
  try {
    const token = localStorage.getItem('lawyer_token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lawyer/dashboard-stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    const data = await response.json();
    setStats(data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    setError(error.message);
  }
}; 