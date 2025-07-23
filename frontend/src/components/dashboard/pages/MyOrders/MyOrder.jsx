import React, { useState } from 'react';
import './MyOrder.css';

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  // Mock data for consultations
  const consultations = {
    ongoing: [
      {
        id: 1,
        lawyer: {
          name: 'Karthik Sharma',
          image: '/lawyer1.jpg',
          rating: 4.8,
          specialization: 'Criminal Law'
        },
        case: {
          title: 'Property Dispute Resolution',
          status: 'In Progress',
          startDate: '2024-02-15',
          nextMeeting: '2024-03-10 14:00',
          totalTime: '5.5 hours',
          amount: '10,200'
        }
      },
      {
        id: 2,
        lawyer: {
          name: 'Mihir Awasthi',
          image: '/lawyer2.jpg',
          rating: 4.9,
          specialization: 'Corporate Law'
        },
        case: {
          title: 'Employment Contract Review',
          status: 'Scheduled',
          startDate: '2024-03-01',
          nextMeeting: '2024-03-05 11:30',
          totalTime: '2 hours',
          amount: '4,500'
        }
      }
    ],
    past: [
      {
        id: 3,
        lawyer: {
          name: 'Priya Mehta',
          image: '/lawyer3.jpg',
          rating: 4.7,
          specialization: 'Family Law'
        },
        case: {
          title: 'Divorce Consultation',
          status: 'Completed',
          startDate: '2024-01-10',
          endDate: '2024-02-28',
          totalTime: '8 hours',
          amount: '15,000'
        }
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'status-progress';
      case 'scheduled':
        return 'status-scheduled';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="my-orders">
      <h1>My Consultations</h1>
      
      <div className="order-tabs">
        <button 
          className={`tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Consultations
        </button>
        <button 
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Consultations
        </button>
      </div>

      <div className="consultations-list">
        {consultations[activeTab].map(consultation => (
          <div key={consultation.id} className="consultation-card">
            <div className="lawyer-info">
              <div className="lawyer-image">
                <img src={consultation.lawyer.image} alt={consultation.lawyer.name} />
              </div>
              <div className="lawyer-details">
                <h3>{consultation.lawyer.name}</h3>
                <p className="specialization">{consultation.lawyer.specialization}</p>
                <div className="rating">
                  <span className="rating-score">{consultation.lawyer.rating} ★</span>
                </div>
              </div>
            </div>

            <div className="case-info">
              <div className="case-header">
                <h4>{consultation.case.title}</h4>
                <span className={`status ${getStatusColor(consultation.case.status)}`}>
                  {consultation.case.status}
                </span>
              </div>

              <div className="case-details">
                <div className="detail-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Started: {formatDate(consultation.case.startDate)}</span>
                </div>
                
                {consultation.case.endDate && (
                  <div className="detail-item">
                    <i className="fas fa-flag-checkered"></i>
                    <span>Completed: {formatDate(consultation.case.endDate)}</span>
                  </div>
                )}

                {consultation.case.nextMeeting && (
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <span>Next Meeting: {formatDateTime(consultation.case.nextMeeting)}</span>
                  </div>
                )}

                <div className="detail-item">
                  <i className="fas fa-hourglass-half"></i>
                  <span>Total Time: {consultation.case.totalTime}</span>
                </div>

                <div className="detail-item">
                  <i className="fas fa-rupee-sign"></i>
                  <span>Amount: ₹{consultation.case.amount}</span>
                </div>
              </div>

              {activeTab === 'ongoing' && (
                <div className="case-actions">
                  <button className="action-button schedule">
                    <i className="fas fa-video"></i>
                    Join Meeting
                  </button>
                  <button className="action-button chat">
                    <i className="fas fa-comment-alt"></i>
                    Chat
                  </button>
                  <button className="action-button documents">
                    <i className="fas fa-file-alt"></i>
                    Documents
                  </button>
                </div>
              )}

              {activeTab === 'past' && (
                <div className="case-actions">
                  <button className="action-button review">
                    <i className="fas fa-star"></i>
                    Write Review
                  </button>
                  <button className="action-button documents">
                    <i className="fas fa-file-alt"></i>
                    View Documents
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {consultations[activeTab].length === 0 && (
        <div className="no-consultations">
          <i className="fas fa-folder-open"></i>
          <p>No {activeTab} consultations found</p>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
