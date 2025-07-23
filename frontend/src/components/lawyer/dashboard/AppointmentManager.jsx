import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './AppointmentManager.css';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAppointments = async (date) => {
    try {
      const response = await fetch(`/api/lawyer/appointments?date=${date.toISOString()}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await fetch(`/api/lawyer/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      fetchAppointments(selectedDate);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const renderAppointmentDetails = (appointment) => (
    <div className="appointment-details">
      <h3>Appointment Details</h3>
      <div className="detail-row">
        <span>Client:</span>
        <span>{appointment.clientName}</span>
      </div>
      <div className="detail-row">
        <span>Time:</span>
        <span>{new Date(appointment.datetime).toLocaleTimeString()}</span>
      </div>
      <div className="detail-row">
        <span>Duration:</span>
        <span>{appointment.duration} minutes</span>
      </div>
      <div className="detail-row">
        <span>Case Type:</span>
        <span>{appointment.caseType}</span>
      </div>
      <div className="detail-row">
        <span>Status:</span>
        <select
          value={appointment.status}
          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="appointment-actions">
        <button onClick={() => window.location.href = `/lawyer/chat/${appointment.clientId}`}>
          <i className="fas fa-comments"></i> Chat with Client
        </button>
        <button onClick={() => window.location.href = `/lawyer/video-call/${appointment.id}`}>
          <i className="fas fa-video"></i> Start Video Call
        </button>
      </div>
    </div>
  );

  return (
    <div className="appointment-manager">
      <div className="calendar-section">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const appointmentsOnDay = appointments.filter(
              app => new Date(app.datetime).toDateString() === date.toDateString()
            );
            return appointmentsOnDay.length > 0 && (
              <div className="appointment-indicator">
                {appointmentsOnDay.length}
              </div>
            );
          }}
        />
      </div>

      <div className="appointments-list">
        <h2>Appointments for {selectedDate.toDateString()}</h2>
        {appointments.map(appointment => (
          <div
            key={appointment.id}
            className={`appointment-card ${appointment.status}`}
            onClick={() => setSelectedAppointment(appointment)}
          >
            <div className="appointment-time">
              {new Date(appointment.datetime).toLocaleTimeString()}
            </div>
            <div className="appointment-info">
              <h4>{appointment.clientName}</h4>
              <p>{appointment.caseType}</p>
            </div>
            <div className="appointment-status">
              {appointment.status}
            </div>
          </div>
        ))}
      </div>

      {selectedAppointment && (
        <div className="appointment-modal">
          <div className="modal-content">
            {renderAppointmentDetails(selectedAppointment)}
            <button 
              className="close-modal"
              onClick={() => setSelectedAppointment(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManager; 