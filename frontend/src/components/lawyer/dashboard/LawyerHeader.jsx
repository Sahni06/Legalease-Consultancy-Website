import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './LawyerHeader.module.css';

const LawyerHeader = () => {
  const navigate = useNavigate();
  const lawyer = JSON.parse(localStorage.getItem('lawyer') || '{}');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('lawyer_token');
    localStorage.removeItem('lawyer');
    navigate('/lawyer/login');
  };

  const navItems = [
    { path: '/lawyer/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/lawyer/appointments', label: 'Appointments', icon: 'calendar-alt' },
    { path: '/lawyer/clients', label: 'Clients', icon: 'users' },
    { path: '/lawyer/consultations', label: 'Consultations', icon: 'comments' },
    { path: '/lawyer/documents', label: 'Documents', icon: 'file-alt' },
    { path: '/lawyer/earnings', label: 'Earnings', icon: 'rupee-sign' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/photos/logo.png" alt="Logo" />
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <i className={`fas fa-${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.profile}>
        <div 
          className={styles.profileTrigger}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img 
            src={lawyer.profilePicture || '/default-avatar.png'} 
            alt="Profile" 
          />
          <span>{lawyer.fullName}</span>
          <i className="fas fa-chevron-down"></i>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <NavLink to="/lawyer/profile" className={styles.dropdownItem}>
              <i className="fas fa-user"></i> Profile
            </NavLink>
            <button onClick={handleLogout} className={styles.dropdownItem}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default LawyerHeader;
