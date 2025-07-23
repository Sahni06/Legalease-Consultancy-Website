import React, { useState, useEffect } from 'react';
import { API_URL, ENDPOINTS } from '../../../../utils/api';
import './LawyerEarnings.css';

const LawyerEarnings = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    monthly: 0,
    weekly: 0,
    transactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const response = await fetch(`${API_URL}/lawyer/earnings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setEarnings(data);
      }
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="earnings-container">
      <h2>My Earnings</h2>
      
      <div className="earnings-summary">
        <div className="earnings-card total">
          <h3>Total Earnings</h3>
          <p>₹{earnings.total}</p>
        </div>
        <div className="earnings-card monthly">
          <h3>This Month</h3>
          <p>₹{earnings.monthly}</p>
        </div>
        <div className="earnings-card weekly">
          <h3>This Week</h3>
          <p>₹{earnings.weekly}</p>
        </div>
      </div>

      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="transactions-list">
          {earnings.transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="client-info">
                <h4>{transaction.clientName}</h4>
                <p>{transaction.date}</p>
              </div>
              <div className="amount">₹{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerEarnings;
