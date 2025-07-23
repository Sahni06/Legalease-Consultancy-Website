import React from 'react';
import './lawyercard.css';

const LawyerCards = () => {
  const lawyers = [
    {
      name: "Adv.Cyril Thomas",
      image: "/photos/lawyer.jpg", // Replace with actual image path
      rating: 4.8,
      reviews: 127,
      specialization: "Corporate Law, Startups, Employment Issues, RERA Consultation, Arbitration Law, harassment at workplace, Custody Debt Recovery",
      experience: 12,
      languages: ["English", "Hindi", "TMalyali"],
      charges: 5000,
    },
    {
      name: "Rohit Sharma",
      image: "/photos/lawyer.jpg",
      rating: 4.9,
      reviews: 243,
      specialization: "Criminal Law, Employment Issues, Cyber Crime, Civil Matters",
      experience: 15,
      languages: ["English", "Mandarin", "French"],
      charges: 6000,
    },
    {
      name: "Adv. Michael Chen",
      image: "/photos/lawyer.jpg",
      rating: 4.9,
      reviews: 243,
      specialization: "Criminal Law, Civil Rights",
      experience: 15,
      languages: ["English", "Mandarin", "French"],
      charges: 6000,
    },
    {
      name: "Adv. Michael Chen",
      image: "/photos/lawyer.jpg",
      rating: 4.9,
      reviews: 243,
      specialization: "Criminal Law, Civil Rights",
      experience: 15,
      languages: ["English", "Mandarin", "French"],
      charges: 6000,
    },
    {
      name: "Adv. Michael Chen",
      image: "/photos/lawyer.jpg",
      rating: 4.9,
      reviews: 243,
      specialization: "Criminal Law, Civil Rights",
      experience: 15,
      languages: ["English", "Mandarin", "French"],
      charges: 6000,
    },
    {
      name: "Adv. Michael Chen",
      image: "/photos/lawyer.jpg",
      rating: 4.9,
      reviews: 243,
      specialization: "Criminal Law, Civil Rights",
      experience: 15,
      languages: ["English", "Mandarin", "French"],
      charges: 6000,
    }
  ];

  return (
    <section className="lawyer-cards">
      <h2>Top Rated Lawyers</h2>
      <div className="cards-container">
        <div className="cards">
          {lawyers.map((lawyer, index) => (
            <div className="lawyer-card" key={index}>
              <div className="card-image">
                <img src={lawyer.image} alt={lawyer.name} />
              </div>
              <div className="card-content">
                <h3>{lawyer.name}</h3>
                
                <div className="rating-section">
                  <div className="stars">
                    {'★'.repeat(Math.floor(lawyer.rating))}
                    {'☆'.repeat(5 - Math.floor(lawyer.rating))}
                    <span className="rating-number">{lawyer.rating}</span>
                  </div>
                  <span className="reviews">({lawyer.reviews} reviews)</span>
                </div>

                <div className="info-section">
                  <p className="specialization">
                    <strong>Specialization:</strong> {lawyer.specialization}
                  </p>
                  <p className="experience">
                    <strong>Experience:</strong> {lawyer.experience} years
                  </p>
                  <p className="languages">
                    <strong>Languages:</strong> {lawyer.languages.join(", ")}
                  </p>
                  <p className="charges">
                    <strong>Charges:</strong> ₹{lawyer.charges}/day
                  </p>
                </div>

                <button className="consult-btn">Book Consultation</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LawyerCards;