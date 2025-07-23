import React, { useState, useEffect } from 'react';
import './DashboardOverview.css';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lawyer/dashboard-stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className={`stats-grid ${loading ? 'loading' : ''}`}>
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <div className="stat-info">
            <h3>Total Clients</h3>
            <p>{stats ? stats.totalClients : 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-calendar-check"></i>
          <div className="stat-info">
            <h3>Active Appointments</h3>
            <p>{stats ? stats.activeAppointments : 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-rupee-sign"></i>
          <div className="stat-info">
            <h3>Total Earnings</h3>
            <p>₹{stats ? stats.totalEarnings : 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-clock"></i>
          <div className="stat-info">
            <h3>Pending Consultations</h3>
            <p>{stats ? stats.pendingConsultations : 0}</p>
          </div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DashboardOverview;
