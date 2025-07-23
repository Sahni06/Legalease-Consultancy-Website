import React, { createContext, useContext, useState, useEffect } from 'react';
import { lawyerAuthService } from '../services/api/lawyerAuth';

const LawyerAuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export const LawyerAuthProvider = ({ children }) => {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('lawyer_token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await verifyToken();
        if (!ignore && response.success && response.valid) {
          const lawyerData = response.lawyer;
          setLawyer(lawyerData);
          localStorage.setItem('lawyer', JSON.stringify(lawyerData));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (!ignore) {
          localStorage.removeItem('lawyer_token');
          localStorage.removeItem('lawyer');
          setLawyer(null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    checkAuth();
    return () => {
      ignore = true;
    };
  }, []);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/lawyer/verify-token`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      // ...existing code...
    } catch (error) {
      console.error('Token verification failed:', error);
      throw error;
    }
  };

  const login = (lawyerData, token) => {
    localStorage.setItem('lawyer_token', token);
    localStorage.setItem('lawyer', JSON.stringify(lawyerData));
    setLawyer(lawyerData);
  };

  const logout = () => {
    localStorage.removeItem('lawyer_token');
    localStorage.removeItem('lawyer');
    setLawyer(null);
  };

  const contextValue = {
    lawyer,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!lawyer
  };

  return (
    <LawyerAuthContext.Provider value={contextValue}>
      {children}
    </LawyerAuthContext.Provider>
  );
};

export const useLawyerAuth = () => {
  const context = useContext(LawyerAuthContext);
  if (!context) {
    throw new Error('useLawyerAuth must be used within LawyerAuthProvider');
  }
  return context;
};