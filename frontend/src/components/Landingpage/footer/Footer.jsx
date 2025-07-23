import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>LegalEase</h3>
          <p>Your trusted partner in legal solutions. We connect you with experienced lawyers for all your legal needs.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/lawyers">Find a Lawyer</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal Services</h4>
          <ul>
            <li><a href="/services/family-law">Family Law</a></li>
            <li><a href="/services/corporate-law">Corporate Law</a></li>
            <li><a href="/services/criminal-law">Criminal Law</a></li>
            <li><a href="/services/property-law">Property Law</a></li>
            <li><a href="/services/civil-matters">Civil Matters</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><i className="fas fa-phone"></i> +91 123-456-7890</li>
            <li><i className="fas fa-envelope"></i> info@legalease.com</li>
            <li><i className="fas fa-map-marker-alt"></i> 123 Legal Street, Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LegalEase. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/disclaimer">Legal Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 