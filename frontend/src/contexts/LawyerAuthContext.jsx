import React, { createContext, useState, useContext, useEffect } from 'react';

const LawyerAuthContext = createContext(null);

export const LawyerAuthProvider = ({ children }) => {
  const [lawyer, setLawyer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('lawyer_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/lawyer/verify-token`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const data = await response.json();
        setLawyer(data.lawyer);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('lawyer_token');
        localStorage.removeItem('lawyer');
        setLawyer(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (lawyerData, token) => {
    try {
      localStorage.setItem('lawyer_token', token);
      localStorage.setItem('lawyer', JSON.stringify(lawyerData));
      setLawyer(lawyerData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('lawyer_token');
    localStorage.removeItem('lawyer');
    setLawyer(null);
    setIsAuthenticated(false);
  };

  const value = {
    lawyer,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <LawyerAuthContext.Provider value={value}>
      {children}
    </LawyerAuthContext.Provider>
  );
};

export const useLawyerAuth = () => {
  const context = useContext(LawyerAuthContext);
  if (!context) {
    throw new Error('useLawyerAuth must be used within a LawyerAuthProvider');
  }
  return context;
}; 