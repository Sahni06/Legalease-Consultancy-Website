import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    },
    professionalInfo: {
      practiceAreas: [],
      experience: '',
      barCouncilNumber: '',
      languages: []
    },
    availability: {
      schedule: {},
      consultationFee: ''
    },
    notifications: {
      email: true,
      sms: true,
      appointments: true,
      messages: true
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/lawyer/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/lawyer/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>

      <form onSubmit={handleSubmit}>
        <section className="settings-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={profile.personalInfo.fullName}
              onChange={(e) => setProfile({
                ...profile,
                personalInfo: {
                  ...profile.personalInfo,
                  fullName: e.target.value
                }
              })}
            />
          </div>
          {/* Add more personal info fields */}
        </section>

        <section className="settings-section">
          <h3>Professional Information</h3>
          <div className="form-group">
            <label>Practice Areas</label>
            <select
              multiple
              value={profile.professionalInfo.practiceAreas}
              onChange={(e) => setProfile({
                ...profile,
                professionalInfo: {
                  ...profile.professionalInfo,
                  practiceAreas: Array.from(
                    e.target.selectedOptions,
                    option => option.value
                  )
                }
              })}
            >
              {/* Add practice area options */}
            </select>
          </div>
          {/* Add more professional info fields */}
        </section>

        <section className="settings-section">
          <h3>Availability & Fees</h3>
          <div className="form-group">
            <label>Consultation Fee (per minute)</label>
            <input
              type="number"
              value={profile.availability.consultationFee}
              onChange={(e) => setProfile({
                ...profile,
                availability: {
                  ...profile.availability,
                  consultationFee: e.target.value
                }
              })}
            />
          </div>
          {/* Add schedule management */}
        </section>

        <section className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={profile.notifications.email}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    email: e.target.checked
                  }
                })}
              />
              Email Notifications
            </label>
          </div>
          {/* Add more notification preferences */}
        </section>

        <button type="submit" className="save-settings">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings; 