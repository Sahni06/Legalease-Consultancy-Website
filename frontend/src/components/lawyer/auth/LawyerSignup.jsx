import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLawyerAuth } from '../../../context/LawyerAuthContext';
import './LawyerSignup.css';
import { API_BASE_URL } from '../../../config';

const LawyerSignup = () => {
  const navigate = useNavigate();
  const { login } = useLawyerAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    
    // Professional Details
    lawFirmName: '',
    practiceAreas: [],
    experience: '',
    barCouncilNumber: '',
    
    // Education & Languages
    education: [],
    certifications: [],
    languagesSpoken: [],
    
    // Location & Availability
    location: {
      city: '',
      state: '',
      country: ''
    },
    availability: {
      monday: [{ isAvailable: false, hours: [] }],
      tuesday: [{ isAvailable: false, hours: [] }],
      wednesday: [{ isAvailable: false, hours: [] }],
      thursday: [{ isAvailable: false, hours: [] }],
      friday: [{ isAvailable: false, hours: [] }],
      saturday: [{ isAvailable: false, hours: [] }],
      sunday: [{ isAvailable: false, hours: [] }]
    },
    
    // Fees & Payment
    consultationFee: '',
    paymentMethods: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const practiceAreaOptions = [
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Civil Law',
    'Real Estate Law',
    'Immigration Law',
    'Tax Law',
    'Intellectual Property Law'
  ];

  const languageOptions = [
    'English',
    'Hindi',
    'Bengali',
    'Tamil',
    'Telugu',
    'Marathi',
    'Gujarati',
    'Kannada',
    'Malayalam'
  ];

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Basic Information</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label className="file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({...formData, profilePicture: file});
            }}
          />
          Upload Profile Picture
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Professional Information</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Law Firm Name (if applicable)"
          value={formData.lawFirmName}
          onChange={(e) => setFormData({...formData, lawFirmName: e.target.value})}
        />
      </div>

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
        <small>Hold Ctrl/Cmd to select multiple areas</small>
      </div>

      <div className="form-group">
        <input
          type="number"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Bar Council Registration Number"
          value={formData.barCouncilNumber}
          onChange={(e) => setFormData({...formData, barCouncilNumber: e.target.value})}
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>Education & Languages</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="education-group">
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
        Add More Education
      </button>

      <div className="form-group">
        <select
          multiple
          value={formData.languagesSpoken}
          onChange={(e) => setFormData({
            ...formData,
            languagesSpoken: Array.from(e.target.selectedOptions, option => option.value)
          })}
        >
          {languageOptions.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <small>Hold Ctrl/Cmd to select multiple languages</small>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>Location & Availability</h3>
      <div className="location-group">
        <input
          type="text"
          placeholder="City"
          value={formData.location.city}
          onChange={(e) => setFormData({
            ...formData,
            location: {...formData.location, city: e.target.value}
          })}
        />
        <input
          type="text"
          placeholder="State"
          value={formData.location.state}
          onChange={(e) => setFormData({
            ...formData,
            location: {...formData.location, state: e.target.value}
          })}
        />
        <input
          type="text"
          placeholder="Country"
          value={formData.location.country}
          onChange={(e) => setFormData({
            ...formData,
            location: {...formData.location, country: e.target.value}
          })}
        />
      </div>

      <div className="availability-section">
        {Object.keys(formData.availability).map(day => (
          <div key={day} className="day-availability">
            <label>
              <input
                type="checkbox"
                checked={formData.availability[day][0].isAvailable}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    [day]: [{
                      isAvailable: e.target.checked,
                      hours: formData.availability[day][0].hours
                    }]
                  }
                })}
              />
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
            {formData.availability[day][0].isAvailable && (
              <div className="hours-selection">
                <select
                  multiple
                  value={formData.availability[day][0].hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: {
                      ...formData.availability,
                      [day]: [{
                        isAvailable: formData.availability[day][0].isAvailable,
                        hours: Array.from(e.target.selectedOptions, option => option.value)
                      }]
                    }
                  })}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i}:00`}>
                      {`${i}:00`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="form-step">
      <h3>Fees & Payment</h3>
      <div className="form-group">
        <input
          type="number"
          placeholder="Consultation Fee (per minute)"
          value={formData.consultationFee}
          onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <div className="payment-methods">
          {['Amazon Pay', 'Stripe', 'Razorpay'].map(method => (
            <label key={method}>
              <input
                type="checkbox"
                checked={formData.paymentMethods.includes(method)}
                onChange={(e) => {
                  const methods = e.target.checked
                    ? [...formData.paymentMethods, method]
                    : formData.paymentMethods.filter(m => m !== method);
                  setFormData({...formData, paymentMethods: methods});
                }}
              />
              {method}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      
      // Handle special case for availability
      Object.keys(formData).forEach(key => {
        if (key === 'profilePicture') {
          if (formData[key]) {
            data.append(key, formData[key]);
          }
        } else if (key === 'availability') {
          data.append(key, JSON.stringify(formData[key]));
        } else if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      console.log('Sending signup request to:', `${API_BASE_URL}/lawyer/signup`);
      
      const response = await fetch(`${API_BASE_URL}/lawyers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Signup failed');
      }

      // Navigate to login page after successful signup
      navigate('/lawyer/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-signup-container">
      {error && <div className="error-message">{error}</div>}
      <div className="signup-progress">
        {[1, 2, 3, 4, 5].map(step => (
          <div
            key={step}
            className={`progress-step ${currentStep >= step ? 'active' : ''}`}
          >
            Step {step}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LawyerSignup;