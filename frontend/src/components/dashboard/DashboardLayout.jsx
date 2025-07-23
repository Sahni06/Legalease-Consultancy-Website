import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardNavbar from './DashboardNavbar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user } = useAuth();
  
  const userProfile = {
    name: user?.name || 'Guest',
    balance: user?.balance || '0',
    avatar: user?.avatar || null
  };

  return (
    <div className="dashboard-layout">
      <DashboardNavbar userProfile={userProfile} />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 