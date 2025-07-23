import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/api';
import './LawyerClients.css';

const LawyerClients = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/lawyer/consultations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setConsultations(data.consultations);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultationAction = async (consultationId, action) => {
    try {
      const response = await fetch(`${API_URL}/lawyer/consultation/${consultationId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchConsultations(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating consultation:', error);
    }
  };

  return (
    <div className="clients-container">
      <h2>Client Requests</h2>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="consultation-requests">
          {consultations.map(consultation => (
            <div key={consultation._id} className="consultation-card">
              <div className="client-info">
                <h3>{consultation.user.name}</h3>
                <p>Request Type: {consultation.requestType}</p>
                <p>Status: {consultation.status}</p>
                <p>Requested: {new Date(consultation.createdAt).toLocaleDateString()}</p>
                <p>Message: {consultation.message}</p>
              </div>
              
              {consultation.status === 'pending' && (
                <div className="action-buttons">
                  <button 
                    className="accept-btn"
                    onClick={() => handleConsultationAction(consultation._id, 'accept')}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleConsultationAction(consultation._id, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerClients;