import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppointmentManager.css';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lawyer/appointments?date=${selectedDate.toISOString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="appointment-manager">
      <div className="calendar-section">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => {
            const hasAppointments = appointments.some(
              app => new Date(app.date).toDateString() === date.toDateString()
            );
            return hasAppointments ? <div className="appointment-indicator" /> : null;
          }}
        />
      </div>

      <div className="appointments-list">
        <h2>Appointments for {selectedDate.toDateString()}</h2>
        {loading ? (
          <div className="loading">Loading appointments...</div>
        ) : appointments.length > 0 ? (
          appointments.map(appointment => (
            <div key={appointment._id} className="appointment-card">
              <div className="time">
                {new Date(appointment.time).toLocaleTimeString()}
              </div>
              <div className="details">
                <h3>{appointment.clientName}</h3>
                <p>{appointment.purpose}</p>
              </div>
              <div className="actions">
                <button className="accept">Accept</button>
                <button className="reschedule">Reschedule</button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-appointments">
            No appointments for this date
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManager;
