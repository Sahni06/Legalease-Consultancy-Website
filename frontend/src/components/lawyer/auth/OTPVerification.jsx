import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OTPVerification.css';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/lawyer/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: location.state?.email,
          otp: otp.join('')
        })
      });

      const data = await response.json();
      if (data.success) {
        navigate('/lawyer/profile-completion');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Verification failed. Please try again.');
    }
  };

  const resendOTP = async () => {
    try {
      await fetch('/api/lawyer/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: location.state?.email })
      });
      setTimer(60);
      setError('');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="otp-verification-container">
      <h2>Verify Your Account</h2>
      <p>Enter the 6-digit code sent to your email/phone</p>

      <form onSubmit={handleSubmit}>
        <div className="otp-input-container">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="verify-btn">
          Verify OTP
        </button>

        <div className="resend-container">
          {timer > 0 ? (
            <p>Resend code in {timer}s</p>
          ) : (
            <button type="button" onClick={resendOTP} className="resend-btn">
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OTPVerification; 