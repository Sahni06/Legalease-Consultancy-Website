import React, { useState, useEffect } from 'react';
import './reviews.css';

const Reviews = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "15 March 2024",
      review: "Excellent legal advice! The lawyer was very professional and helped me understand my rights clearly. The whole process was smooth and efficient.",
      service: "Property Dispute",
      lawyer: "Adv. Priya Patel"
    },
    {
      name: "Anjali Singh",
      rating: 4,
      date: "12 March 2024",
      review: "Very knowledgeable and patient lawyer. Explained everything in detail. Would definitely recommend their services.",
      service: "Divorce Consultation",
      lawyer: "Adv. Rajesh Kumar"
    },
    {
      name: "Mohammed Khan",
      rating: 5,
      date: "10 March 2024",
      review: "Outstanding service! The lawyer was prompt in responding and provided practical solutions to my legal issues.",
      service: "Corporate Law",
      lawyer: "Adv. Sarah Johnson"
    },
    {
      name: "Priya Verma",
      rating: 4.5,
      date: "8 March 2024",
      review: "Great experience overall. The consultation was thorough and the advice was very helpful.",
      service: "Consumer Protection",
      lawyer: "Adv. Amit Shah"
    },
    {
      name: "John Matthews",
      rating: 5,
      date: "5 March 2024",
      review: "Exceptional legal support. The lawyer's expertise in handling my case was remarkable.",
      service: "Criminal Defense",
      lawyer: "Adv. Vikram Singh"
    }
  ];

  const [currentReviews, setCurrentReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to shuffle array
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setCurrentReviews(shuffleArray(reviews));
  }, []);

  const nextReview = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === currentReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? currentReviews.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    return stars;
  };

  return (
    <section className="reviews-section">
      <h2>Client Reviews</h2>
      <div className="reviews-container">
        <button className="nav-button prev" onClick={prevReview}>❮</button>
        
        <div className="review-card">
          {currentReviews.length > 0 && (
            <>
              <div className="review-header">
                <div className="client-info">
                  <div className="client-name">{currentReviews[activeIndex].name}</div>
                  <div className="review-date">{currentReviews[activeIndex].date}</div>
                </div>
                <div className="rating">
                  {renderStars(currentReviews[activeIndex].rating)}
                </div>
              </div>

              <div className="service-info">
                <span className="service-type">{currentReviews[activeIndex].service}</span>
                <span className="lawyer-name">{currentReviews[activeIndex].lawyer}</span>
              </div>

              <div className="review-content">
                "{currentReviews[activeIndex].review}"
              </div>
            </>
          )}
        </div>

        <button className="nav-button next" onClick={nextReview}>❯</button>
      </div>

      <div className="review-dots">
        {currentReviews.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
