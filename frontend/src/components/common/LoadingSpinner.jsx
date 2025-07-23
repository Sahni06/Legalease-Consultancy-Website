import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner-container ${size}`}>
      <div className={`spinner ${color}`}></div>
    </div>
  );
};

export default LoadingSpinner; 