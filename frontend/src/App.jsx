import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'
import Home from './components/Home'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import DashboardLayout from './components/dashboard/DashboardLayout'
import ChatBot from './components/ChatBot/ChatBot';
import Navbar from './components/Landingpage/navbar';
import LawyerLogin from './components/lawyer/auth/LawyerLogin';
import LawyerSignup from './components/lawyer/auth/LawyerSignup';
import LawyerDashboardLayout from './components/lawyer/dashboard/LawyerDashboardLayout';
import LawyerAppointments from './components/lawyer/dashboard/pages/LawyerAppointments';
import LawyerClients from './components/lawyer/dashboard/pages/LawyerClients';
import LawyerConsultations from './components/lawyer/dashboard/pages/LawyerConsultations';
import LawyerDocuments from './components/lawyer/dashboard/pages/LawyerDocuments';
import LawyerProfile from './components/lawyer/dashboard/pages/LawyerProfile';
import DashboardOverview from './components/lawyer/dashboard/pages/DashboardOverview';
import AppointmentManager from './components/lawyer/dashboard/pages/AppointmentManager';
import LawyerEarnings from './components/lawyer/dashboard/pages/LawyerEarnings';

// Dashboard components
import Dashboard from './components/dashboard/pages/Dashboard/Dashboard'
import TalkToLawyer from './components/dashboard/pages/TalkToLawyer/TalkToLawyer'
import MyOrders from './components/dashboard/pages/MyOrders/MyOrder'
import FavoriteLawyers from './components/dashboard/pages/FavoriteLawyers/FavoriteLawyers.jsx'
import Profile from './components/dashboard/pages/Profile/Profile'

// Create placeholder components for missing routes
const AskLawyer = () => <div>Ask Lawyer Component</div>;
const Schedule = () => <div>Schedule Component</div>;

import { API_URL, ENDPOINTS } from './utils/api';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="error-container">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Lawyer Protected Route
const LawyerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const isLawyerAuthenticated = localStorage.getItem('lawyer_token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!isLawyerAuthenticated) {
          throw new Error('No token found');
        }

        // Remove duplicate /api prefix
        const response = await fetch(`${import.meta.env.VITE_API_URL}/lawyer/verify-token`, {
          headers: {
            'Authorization': `Bearer ${isLawyerAuthenticated}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Token verification failed');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('lawyer_token');
        localStorage.removeItem('lawyer');
        navigate('/lawyer/login');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [navigate, isLawyerAuthenticated]);

  if (isVerifying) {
    return <div>Verifying...</div>;
  }

  if (!isLawyerAuthenticated) {
    return <Navigate to="/lawyer/login" />;
  }

  return children;
};

import { LawyerAuthProvider } from './context/LawyerAuthContext';

// Add these imports at the top
import AdminLogin from './components/admin/auth/AdminLogin';
import AdminSignup from './components/admin/auth/AdminSignup';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import BlogPage from './components/blogs/BlogPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Public routes */}
      <Route index element={<><Navbar /><Home /></>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="blogs" element={<BlogPage />} />
      
      {/* Lawyer routes */}
      <Route path="lawyer">
        <Route path="login" element={<LawyerLogin />} />
        <Route path="signup" element={<LawyerSignup />} />
        <Route
          element={
            <LawyerProtectedRoute>
              <LawyerDashboardLayout />
            </LawyerProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="appointments" element={<AppointmentManager />} />
          <Route path="clients" element={<LawyerClients />} />
          <Route path="consultations" element={<LawyerConsultations />} />
          <Route path="documents" element={<LawyerDocuments />} />
          <Route path="earnings" element={<LawyerEarnings />} />
          <Route path="profile" element={<LawyerProfile />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route path="admin">
        <Route path="login" element={<AdminLogin />} />
        <Route path="signup" element={<AdminSignup />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* User dashboard routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="talk-to-lawyer" element={<TalkToLawyer />} />
        <Route path="ask-lawyer" element={<AskLawyer />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="favorite-lawyers" element={<FavoriteLawyers />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <AuthProvider>
        <LawyerAuthProvider>
          <RouterProvider router={router} />
          <ChatBot />
        </LawyerAuthProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
