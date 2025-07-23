import React, { useState, useEffect } from 'react';
import './LawyerAppointments.css';

const LawyerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchAppointments = async () => {
      try {
        // Simulated data for now
        const mockAppointments = [
          {
            id: 1,
            clientName: "John Doe",
            date: "2024-03-20",
            time: "10:00 AM",
            status: "pending",
            type: "Video Call",
          },
          {
            id: 2,
            clientName: "Jane Smith",
            date: "2024-03-21",
            time: "2:00 PM",
            status: "confirmed",
            type: "In Person",
          },
        ];
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    // TODO: Implement status update API call
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="lawyer-appointments">
      <h2>My Appointments</h2>
      
      <div className="appointments-grid">
        {appointments.map((appointment) => (
          <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
            <div className="appointment-header">
              <h3>{appointment.clientName}</h3>
              <span className={`status-badge ${appointment.status}`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="appointment-details">
              <p>
                <i className="far fa-calendar"></i>
                {appointment.date}
              </p>
              <p>
                <i className="far fa-clock"></i>
                {appointment.time}
              </p>
              <p>
                <i className="fas fa-video"></i>
                {appointment.type}
              </p>
            </div>

            <div className="appointment-actions">
              {appointment.status === 'pending' && (
                <>
                  <button 
                    className="accept-btn"
                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleStatusChange(appointment.id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
              {appointment.status === 'confirmed' && (
                <button className="start-btn">
                  Start Consultation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerAppointments; 