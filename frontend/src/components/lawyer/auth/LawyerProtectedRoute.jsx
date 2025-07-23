import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLawyerAuth } from '../../../contexts/LawyerAuthContext';

const LawyerProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useLawyerAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/lawyer/login" state={{ from: location }} replace />;
  }

  return children;
};

export default LawyerProtectedRoute;