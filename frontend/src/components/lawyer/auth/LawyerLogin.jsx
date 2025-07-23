import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { lawyerAuthService } from '../../../services/api/lawyerAuth';
import './LawyerLogin.css';
import env from '@/config/env.config';

const LawyerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Log the request URL for debugging
      console.log('Login request to:', `${env.API_URL}/lawyer/login`);
      
      const response = await fetch(`${env.API_URL}/lawyer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and lawyer data
      localStorage.setItem('lawyer_token', data.token);
      localStorage.setItem('lawyer', JSON.stringify(data.lawyer));

      // Call context login
      await lawyerAuthService.login(data.lawyer, data.token);
      navigate('/lawyer/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav>
        <a href="/" ><img src="/photos/logo.png" alt="logo" className='nav' /></a>
      </nav>
      <div className="lawyer-login-container">
        <div className="login-box">
          <h2>Lawyer Login</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                name="email"
                id="lawyer-email"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                name="password"
                id="lawyer-password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to="/lawyer/signup">Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerLogin;