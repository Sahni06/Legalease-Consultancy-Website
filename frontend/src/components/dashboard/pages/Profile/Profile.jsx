import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    language: user?.language || '',
    occupation: user?.occupation || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to update user profile would go here
      // await axios.put('/api/user/profile', formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        </div>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p className="profile-email">{user?.email}</p>
          <button 
            className="edit-profile-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Language</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{formData.name}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{formData.email}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">{formData.phone || 'Not provided'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{formData.dateOfBirth || 'Not provided'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{formData.gender || 'Not provided'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Language</span>
                  <span className="detail-value">{formData.language || 'Not provided'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Occupation</span>
                  <span className="detail-value">{formData.occupation || 'Not provided'}</span>
                </div>
              </div>

              <div className="detail-item full-width">
                <span className="detail-label">Address</span>
                <span className="detail-value">
                  {formData.address ? (
                    <>
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} - {formData.pincode}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </span>
              </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Profile;