import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LawyerDashboard from '../components/lawyer/dashboard/LawyerDashboard';
import LawyerSignup from '../components/lawyer/auth/LawyerSignup';
import LawyerLogin from '../components/lawyer/auth/LawyerLogin';
import OTPVerification from '../components/lawyer/auth/OTPVerification';
import ProfileCompletion from '../components/lawyer/auth/ProfileCompletion';
import AppointmentManager from '../components/lawyer/dashboard/AppointmentManager';
import LiveChat from '../components/lawyer/chat/LiveChat';
import BlogManager from '../components/lawyer/dashboard/BlogManager';
import EarningsDashboard from '../components/lawyer/dashboard/EarningsDashboard';
import ProfileSettings from '../components/lawyer/dashboard/ProfileSettings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('lawyer_token');
  return isAuthenticated ? children : <Navigate to="/lawyer/login" />;
};

const LawyerRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/lawyer/signup" element={<LawyerSignup />} />
      <Route path="/lawyer/login" element={<LawyerLogin />} />
      <Route path="/lawyer/verify-otp" element={<OTPVerification />} />
      
      {/* Protected Routes */}
      <Route path="/lawyer" element={
        <ProtectedRoute>
          <LawyerDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<EarningsDashboard />} />
        <Route path="appointments" element={<AppointmentManager />} />
        <Route path="chat/:clientId" element={<LiveChat />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="earnings" element={<EarningsDashboard />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="profile-completion" element={<ProfileCompletion />} />
      </Route>
    </Routes>
  );
};

export default LawyerRoutes; 