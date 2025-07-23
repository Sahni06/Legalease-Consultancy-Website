import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Expert legal guide at your finger tip</h1>
      <p>Consult, Connect & Resolve with ease</p>
      <Link to="/login">
        <button className="consult-button">Consult Now</button>
      </Link>
    </section>
  );
};

export default Hero;