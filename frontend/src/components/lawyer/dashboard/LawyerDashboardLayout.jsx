import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useLawyerAuth } from '../../../context/LawyerAuthContext';
import './LawyerDashboardLayout.css';

const LawyerDashboardLayout = () => {
  const { lawyer, loading, logout } = useLawyerAuth();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (!lawyer) return <Navigate to="/lawyer/login" />;

  const handleLogout = () => {
    logout();
    navigate('/lawyer/login');
  };

  return (
    <div className="lawyer-dashboard-layout">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/photos/logo.png" alt="Logo" className="logo" />
          <h1>Lawyer Dashboard</h1>
        </div>
        
        <nav className="main-nav">
          <NavLink to="/lawyer/dashboard" end>
            <i className="fas fa-home"></i> Dashboard
          </NavLink>
          <NavLink to="/lawyer/appointments">
            <i className="fas fa-calendar"></i> Appointments
          </NavLink>
          <NavLink to="/lawyer/clients">
            <i className="fas fa-users"></i> Clients
          </NavLink>
          <NavLink to="/lawyer/documents">
            <i className="fas fa-file-alt"></i> Documents
          </NavLink>
          <NavLink to="/lawyer/earnings">
            <i className="fas fa-dollar-sign"></i> Earnings
          </NavLink>
        </nav>

        <div className="header-right">
          <div className="profile-menu">
            <NavLink to="/lawyer/profile" className="profile-link">
              <img 
                src={lawyer.profilePicture || '/default-avatar.png'} 
                alt={lawyer.fullName} 
                className="profile-pic"
              />
              <span>{lawyer.fullName}</span>
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default LawyerDashboardLayout;