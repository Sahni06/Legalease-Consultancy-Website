import React from 'react';
import { useLawyerAuth } from '../../../../contexts/LawyerAuthContext';
import './LawyerDashboard.css';

const LawyerDashboard = () => {
  const { lawyer } = useLawyerAuth();

  return (
    <div className="lawyer-dashboard">
      <h1>Welcome, {lawyer?.fullName}</h1>
      <div className="dashboard-stats">
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default LawyerDashboard; 