import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/api';
import './LawyerConsultations.css';

const LawyerConsultations = () => {
  const [consultations, setConsultations] = useState({ upcoming: [], past: [] });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availabilitySettings, setAvailabilitySettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, cancelled

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${API_URL}/lawyer/consultations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const upcomingConsultations = data.consultations.filter(c => c.status === 'pending' || c.status === 'accepted');
        const pastConsultations = data.consultations.filter(c => c.status === 'completed' || c.status === 'cancelled');
        setConsultations({
          upcoming: upcomingConsultations,
          past: pastConsultations
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching consultations:', error);
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

  const filteredConsultations = consultations.upcoming.filter(consultation => 
    filter === 'all' ? true : consultation.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#3498db';
      case 'completed':
        return '#2ecc71';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="consultations-container">
      <div className="settings-panel">
        <h3>Availability Settings</h3>
        {/* Time slot configuration */}
        <div className="time-slots">
          {/* Time slot settings UI */}
        </div>
      </div>

      <div className="consultations-header">
        <h2>Consultations</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''} 
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="upcoming-consultations">
        <h3>Pending Consultation Requests</h3>
        <div className="consultation-list">
          {loading ? (
            <div className="loading">Loading consultations...</div>
          ) : consultations.upcoming.length === 0 ? (
            <div className="no-consultations">No pending consultation requests</div>
          ) : (
            consultations.upcoming.map((consultation) => (
              <div key={consultation._id} className="consultation-card">
                <div className="client-info">
                  <h4>{consultation.user.name}</h4>
                  <p>Request Type: {consultation.requestType}</p>
                  <p>Message: {consultation.message}</p>
                  <p>Requested: {new Date(consultation.createdAt).toLocaleString()}</p>
                </div>

                {consultation.status === 'pending' && (
                  <div className="action-buttons">
                    <button 
                      className="accept-btn"
                      onClick={() => handleConsultationAction(consultation._id, 'accept')}
                    >
                      <i className="fas fa-check"></i> Accept
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleConsultationAction(consultation._id, 'reject')}
                    >
                      <i className="fas fa-times"></i> Reject
                    </button>
                  </div>
                )}

                {consultation.status === 'accepted' && (
                  <div className="consultation-actions">
                    <button className="start-btn">
                      <i className="fas fa-video"></i> Start Consultation
                    </button>
                    <button className="reschedule-btn">
                      <i className="fas fa-calendar"></i> Reschedule
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Past consultations section remains unchanged */}
    </div>
  );
};

export default LawyerConsultations;