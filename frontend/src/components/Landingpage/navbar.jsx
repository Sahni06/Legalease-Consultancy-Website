import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first
      window.location.href = '/#' + sectionId;
      return;
    }

    // If on home page, smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/photos/logo.png" alt="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><a href="#talk-to-lawyer" onClick={(e) => handleNavClick(e, 'talk-to-lawyer')}>Talk to a Lawyer</a></li>
        <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
        <li><a href="/Blogs.jsx" onClick={(e) => handleNavClick(e, 'blogs-section')}>Blogs</a></li>
        <li><Link to="/login">Login as client</Link></li>
        <li><Link to="/lawyer/login">Login as lawyer</Link></li>
        <li><Link to="/admin/login">Login as admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;