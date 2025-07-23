import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import './TalkToLawyer.css';

const practiceAreas = [
  'Criminal Law',
  'Civil Law',
  'Corporate Law',
  'Family Law',
  'Real Estate Law',
  'Intellectual Property',
  'Tax Law',
  'Labor Law',
  'Constitutional Law',
  'Environmental Law',
  'Immigration Law',
  'Bankruptcy Law'
];

const TalkToLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    practiceArea: '',
    location: '',
    experience: '',
    sortBy: 'rating'
  });

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lawyer/public-profiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch lawyers');
      }

      const data = await response.json();
      if (data.success) {
        setLawyers(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch lawyers');
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setError(error.message || 'Error loading lawyers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
      lawyer.practiceAreas.some(area => area.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesPracticeArea = !filters.practiceArea || lawyer.practiceAreas.includes(filters.practiceArea);
    const matchesLocation = !filters.location || 
      lawyer.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
      lawyer.location.state.toLowerCase().includes(filters.location.toLowerCase());
    const matchesExperience = !filters.experience || 
      (filters.experience === '0-5' && lawyer.experience <= 5) ||
      (filters.experience === '5-10' && lawyer.experience > 5 && lawyer.experience <= 10) ||
      (filters.experience === '10+' && lawyer.experience > 10);

    return matchesSearch && matchesPracticeArea && matchesLocation && matchesExperience;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'price-low':
        return a.consultationFee - b.consultationFee;
      case 'price-high':
        return b.consultationFee - a.consultationFee;
      default:
        return 0;
    }
  });

  if (loading) return <div className="loading">Loading lawyers...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="talk-to-lawyer">
      {/* Filters Section */}
      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search lawyers..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
        
        <select 
          name="practiceArea" 
          value={filters.practiceArea} 
          onChange={handleFilterChange}
          className="practice-area-filter"
        >
          <option value="">All Practice Areas</option>
          {practiceAreas.map(area => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="rating">Highest Rated</option>
          <option value="experience">Most Experienced</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Lawyers Grid */}
      <div className="lawyers-grid">
        {filteredLawyers.map(lawyer => (
          <div key={lawyer._id} className="lawyer-card">
            <div className="lawyer-image">
              <img src={lawyer.profilePicture} alt={lawyer.fullName} />
              {lawyer.isVerified && (
                <span className="verified-badge">✓ Verified</span>
              )}
            </div>
            
            <div className="lawyer-info">
              <h3>{lawyer.fullName}</h3>
              <div className="rating">
                <span>★ {lawyer.rating.toFixed(1)}</span>
                <span className="consultations">({lawyer.totalConsultations} consultations)</span>
              </div>
              
              <div className="practice-areas">
                {lawyer.practiceAreas.map((area, index) => (
                  <span key={index} className="tag">{area}</span>
                ))}
              </div>
              
              <div className="details">
                <p><i className="fas fa-briefcase"></i> {lawyer.experience} years experience</p>
                <p><i className="fas fa-map-marker-alt"></i> {lawyer.location.city}, {lawyer.location.state}</p>
                <p><i className="fas fa-language"></i> {lawyer.languagesSpoken.join(', ')}</p>
              </div>

              <div className="consultation-fee">
                ₹{lawyer.consultationFee}/consultation
              </div>

              <button className="consult-button">
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalkToLawyer;
