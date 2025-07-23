import React, { useState, useEffect } from 'react';
import { useLawyerAuth } from '../../../../context/LawyerAuthContext';
import { lawyerAuthService } from '../../../../services/api/lawyerAuth';
import './LawyerProfile.css';

const LawyerProfile = () => {
  const { lawyer, login } = useLawyerAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: lawyer.fullName || '',
    email: lawyer.email || '',
    lawFirmName: lawyer.lawFirmName || '',
    practiceAreas: lawyer.practiceAreas || [],
    experience: lawyer.experience || '',
    languagesSpoken: lawyer.languagesSpoken || [],
    location: lawyer.location || { city: '', state: '', country: '' },
    consultationFee: lawyer.consultationFee || '',
    barCouncilNumber: lawyer.barCouncilNumber || ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLawyerProfile();
  }, []);

  const fetchLawyerProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lawyer/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          lawFirmName: data.lawFirmName || '',
          practiceAreas: data.practiceAreas || [],
          experience: data.experience || '',
          languagesSpoken: data.languagesSpoken || [],
          location: data.location || { city: '', state: '', country: '' },
          consultationFee: data.consultationFee || '',
          barCouncilNumber: data.barCouncilNumber || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ text: 'Error loading profile', type: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const response = await lawyerAuthService.updateProfile(formData);
      if (response.success) {
        login(response.lawyer, localStorage.getItem('lawyer_token'));
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setIsEditing(false);
      }
    } catch (error) {
      setMessage({ text: error.message || 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-profile">
      <div className="profile-header">
        <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
        <button 
          className={`edit-button ${isEditing ? 'save' : ''}`}
          onClick={(e) => {
            if (isEditing) {
              handleSubmit(e);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={true} // Email should not be editable
          />
        </div>

        <div className="form-group">
          <label>Law Firm Name</label>
          <input
            type="text"
            name="lawFirmName"
            value={formData.lawFirmName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Bar Council Number</label>
          <input
            type="text"
            name="barCouncilNumber"
            value={formData.barCouncilNumber}
            disabled={true} // Bar Council Number should not be editable
          />
        </div>

        <div className="form-group">
          <label>Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Consultation Fee (₹)</label>
          <input
            type="number"
            name="consultationFee"
            value={formData.consultationFee}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="location-group">
          <h3>Location</h3>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.location.state}
                onChange={handleLocationChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.location.country}
                onChange={handleLocationChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LawyerProfile;