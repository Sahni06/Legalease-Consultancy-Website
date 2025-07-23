import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-title">Select a Problem Statement</div>
          <div className="step-description">Tell us about your legal issue and requirements</div>
        </div>
        
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-title">Choose a Lawyer</div>
          <div className="step-description">Browse through qualified lawyers and select the best match</div>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <div className="step-title">Make Payment</div>
          <div className="step-description">Complete your booking with secure payment</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;