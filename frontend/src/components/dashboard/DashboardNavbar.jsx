import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardNavbar.css';

const DashboardNavbar = ({ userProfile }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { path: '/dashboard/talk-to-lawyer', label: 'Talk to Lawyer', icon: 'fas fa-gavel' },
    { path: '/dashboard/ask-lawyer', label: 'Ask a Lawyer', icon: 'fas fa-question-circle' },
    { path: '/dashboard/my-orders', label: 'My Orders', icon: 'fas fa-list' },
    { path: '/dashboard/schedule', label: 'Schedule', icon: 'fas fa-calendar' },
    { path: '/dashboard/favorite-lawyers', label: 'Favorite Lawyers', icon: 'fas fa-heart' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-container">
        <Link to="/dashboard" className="logo">
         <img src="/photos/logo.png" alt="logo" />
        </Link>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
            >
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="user-profile">
          <div 
            className="profile-trigger"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} />
            ) : (
              <div className="avatar-placeholder">
                {userProfile.name.charAt(0)}
              </div>
            )}
            <span className="profile-name">{userProfile.name}</span>
            <span className="balance">₹{userProfile.balance}</span>
            <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'}`}></i>
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/dashboard/profile" className="dropdown-item">
                <i className="fas fa-user"></i>
                My Profile
              </Link>
              <button onClick={handleLogout} className="dropdown-item logout">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 