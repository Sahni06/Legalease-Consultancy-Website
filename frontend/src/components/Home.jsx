import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Landingpage/hero/hero.jsx'
import HowItWorks from './Landingpage/howitworks/howitworks.jsx'
import Services from './Landingpage/services/services.jsx'
import LawyerCards from './Landingpage/lawyercards/lawyercard.jsx'
import Reviews from './Landingpage/reviews/reviews.jsx'
import Footer from './Landingpage/footer/Footer.jsx'

const Home = () => {
  return (
    <div className="home">
    <Hero/>
    <HowItWorks/>
    <Services/>
    <LawyerCards/>
    <Reviews/>
    <Footer/>
    </div>
  );
};

export default Home;