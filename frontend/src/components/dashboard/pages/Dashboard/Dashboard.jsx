import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Cases</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Scheduled Meetings</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Messages</h3>
          <p>3</p>
        </div>
        <div className="stat-card">
          <h3>Favorite Lawyers</h3>
          <p>4</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 