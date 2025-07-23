import React, { useState } from 'react';
import './FavoriteLawyers.css';

const FavoriteLawyers = () => {
  // Mock data for favorite lawyers
  const [favoriteLawyers, setFavoriteLawyers] = useState([
    {
      id: 1,
      name: 'Karthik Sharma',
      image: '/lawyer1.jpg',
      specialization: 'Criminal Law',
      rating: 4.8,
      reviews: 1383,
      experience: '15 years',
      languages: ['English', 'Hindi', 'Telugu'],
      location: 'Bangalore, Karnataka',
      price: 31,
      available: true
    },
    {
      id: 2,
      name: 'Priya Mehta',
      image: '/lawyer2.jpg',
      specialization: 'Family Law',
      rating: 4.7,
      reviews: 892,
      experience: '12 years',
      languages: ['English', 'Hindi', 'Gujarati'],
      location: 'Mumbai, Maharashtra',
      price: 28,
      available: true
    }
  ]);

  const handleRemoveFavorite = (lawyerId) => {
    setFavoriteLawyers(prev => prev.filter(lawyer => lawyer.id !== lawyerId));
  };

  const handleContact = (lawyer) => {
    // Implement contact functionality
    console.log('Contacting lawyer:', lawyer.name);
  };

  return (
    <div className="favorite-lawyers">
      <div className="favorite-lawyers-header">
        <h1>Favorite Lawyers</h1>
        <p>Your saved list of preferred lawyers</p>
      </div>

      {favoriteLawyers.length === 0 ? (
        <div className="no-favorites">
          <i className="fas fa-heart-broken"></i>
          <h2>No Favorite Lawyers</h2>
          <p>You haven't added any lawyers to your favorites yet.</p>
          <button className="browse-lawyers-btn" onClick={() => window.location.href = '/dashboard/talk-to-lawyer'}>
            Browse Lawyers
          </button>
        </div>
      ) : (
        <div className="lawyers-grid">
          {favoriteLawyers.map(lawyer => (
            <div key={lawyer.id} className="lawyer-card">
              <div className="lawyer-header">
                <button 
                  className="remove-favorite"
                  onClick={() => handleRemoveFavorite(lawyer.id)}
                  title="Remove from favorites"
                >
                  <i className="fas fa-heart"></i>
                </button>
                <span className={`status ${lawyer.available ? 'available' : 'unavailable'}`}>
                  {lawyer.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className="lawyer-profile">
                <div className="lawyer-image">
                  <img src={lawyer.image} alt={lawyer.name} />
                </div>
                <div className="lawyer-info">
                  <h3>{lawyer.name}</h3>
                  <p className="specialization">{lawyer.specialization}</p>
                  
                  <div className="rating">
                    <span className="rating-score">{lawyer.rating} ★</span>
                    <span className="reviews-count">({lawyer.reviews} reviews)</span>
                  </div>

                  <div className="experience">
                    <i className="fas fa-briefcase"></i>
                    <span>{lawyer.experience} experience</span>
                  </div>

                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{lawyer.location}</span>
                  </div>

                  <div className="languages">
                    <i className="fas fa-language"></i>
                    <span>{lawyer.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="lawyer-footer">
                <div className="price">
                  <span className="amount">₹{lawyer.price}</span>
                  <span className="per-min">/min</span>
                </div>

                <div className="action-buttons">
                  <button 
                    className="contact-button"
                    onClick={() => handleContact(lawyer)}
                    disabled={!lawyer.available}
                  >
                    <i className="fas fa-phone"></i>
                    Contact Now
                  </button>
                  <button className="chat-button">
                    <i className="fas fa-comment-alt"></i>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteLawyers;