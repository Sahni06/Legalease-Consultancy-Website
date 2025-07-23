import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCompletion.css';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    profilePic: null,
    dateOfBirth: '',
    gender: '',
    
    // Professional Details
    practiceAreas: [],
    experience: '',
    barCouncilNumber: '',
    chamberAddress: '',
    
    // Education & Certifications
    education: [{
      degree: '',
      institution: '',
      year: ''
    }],
    certifications: [{
      name: '',
      issuingBody: '',
      year: ''
    }],
    
    // Additional Info
    languagesSpoken: [],
    location: {
      city: '',
      state: '',
      country: ''
    },
    
    // Availability & Fees
    availability: {
      weekdays: [],
      timeSlots: []
    },
    consultationFee: '',
    paymentMethods: []
  });

  const practiceAreaOptions = [
    'Criminal Law', 'Civil Law', 'Corporate Law', 'Family Law',
    'Immigration Law', 'Real Estate Law', 'Tax Law', 'Others'
  ];

  const renderStep1 = () => (
    <div className="profile-step">
      <h3>Personal Information</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label className="profile-pic-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({
              ...formData,
              profilePic: e.target.files[0]
            })}
          />
          {formData.profilePic ? (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Profile Preview"
            />
          ) : (
            <div className="upload-placeholder">
              <i className="fas fa-camera"></i>
              <span>Upload Profile Picture</span>
            </div>
          )}
        </label>
      </div>

      <div className="form-group">
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="profile-step">
      <h3>Professional Information</h3>
      <div className="form-group">
        <select
          multiple
          value={formData.practiceAreas}
          onChange={(e) => setFormData({
            ...formData,
            practiceAreas: Array.from(e.target.selectedOptions, option => option.value)
          })}
        >
          {practiceAreaOptions.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Chamber Address"
          value={formData.chamberAddress}
          onChange={(e) => setFormData({...formData, chamberAddress: e.target.value})}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="profile-step">
      <h3>Education & Certifications</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="education-entry">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => {
              const newEducation = [...formData.education];
              newEducation[index].degree = e.target.value;
              setFormData({...formData, education: newEducation});
            }}
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => {
              const newEducation = [...formData.education];
              newEducation[index].institution = e.target.value;
              setFormData({...formData, education: newEducation});
            }}
          />
          <input
            type="number"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => {
              const newEducation = [...formData.education];
              newEducation[index].year = e.target.value;
              setFormData({...formData, education: newEducation});
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormData({
          ...formData,
          education: [...formData.education, { degree: '', institution: '', year: '' }]
        })}
      >
        Add Education
      </button>
    </div>
  );

  const renderStep4 = () => (
    <div className="profile-step">
      <h3>Availability & Fees</h3>
      <div className="form-group">
        <label>Available Days</label>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <label key={day} className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.availability.weekdays.includes(day)}
              onChange={(e) => {
                const weekdays = e.target.checked
                  ? [...formData.availability.weekdays, day]
                  : formData.availability.weekdays.filter(d => d !== day);
                setFormData({
                  ...formData,
                  availability: {...formData.availability, weekdays}
                });
              }}
            />
            {day}
          </label>
        ))}
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Consultation Fee (per minute)"
          value={formData.consultationFee}
          onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
        />
      </div>
    </div>
  );

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'profilePic') {
          formDataToSend.append('profilePic', formData.profilePic);
        } else {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        }
      });

      const response = await fetch('/api/lawyer/complete-profile', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      if (data.success) {
        navigate('/lawyer/dashboard');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
    }
  };

  return (
    <div className="profile-completion-container">
      <div className="progress-bar">
        {[1, 2, 3, 4].map(stepNumber => (
          <div
            key={stepNumber}
            className={`progress-step ${step >= stepNumber ? 'active' : ''}`}
          >
            Step {stepNumber}
          </div>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="navigation-buttons">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}>
              Complete Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileCompletion; 