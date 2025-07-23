import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  const mainServices = [
    {
      title: "Divorce & Child Custody",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Property & Real Estate",
      icon: "🏠"
    },
    {
      title: "Cheque Bounce & Money Recovery",
      icon: "💰"
    },
    {
      title: "Employment Issues",
      icon: "👔"
    },
    {
      title: "Consumer Protection",
      icon: "⚖️"
    },
    {
      title: "Civil Matters",
      icon: "📜"
    },
    {
      title: "Cyber Crime",
      icon: "💻"
    },
    {
      title: "Company & Start-Ups",
      icon: "🚀"
    }
  ];

  const additionalServices = [
    "Other Legal Problem",
    "Criminal Matter",
    "MSME Recovery, MSME related matter",
    "RERA Consultation",
    "Muslim Law",
    "DEBT RECOVERY TRIBUNAL MATTERS",
    "Banking loan Recovery issues, Bank account freeze",
    "Patent, Trademark, Copyright, Intellectual Property Rights",
    "CBI Related matters",
    "Narcotic Drugs and Psychotropic Substances Act (NDPS)",
    "Service Matters, CAT",
    "Arbitration Law",
    "Board of Revenue",
    "Armed Forces Tribunal",
    "NCDRC Consumer Cases",
    "Insolvency & Bankruptcy",
    "Media Law & IP Infringements",
    "Supreme Court Matters, High Court matters",
    "Inheritance and Will",
    "Sexual harassment at workplace",
    "Securities Exchange Board of India (SEBI) matters",
    "Foreign Direct Investment (FDI) matters",
    "NCLT, NCLAT, IBC, Liquidation related",
    "Reserve Bank of India (RBI) related matters",
    "Cryptocurrency issues, Bank account freeze",
    "Startup, ESOPs, Fund raising legal",
    "Corporate Governance, Business Management",
    "Canadian Immigration, Australian immigration, Immigration, VISA",
    "HR Legal Issues, Salary non Payment, Employment Termination",
    "Good and Service Tax (GST), Service Tax, Excise duty",
    "Serious Fraud Investigation Office (SFIO) Matters",
    "Traffic Challan"
  ];

  return (
    <section className="services" id="services"> 
      <h2>Our Services</h2>
      <div className="service-list">
        {mainServices.map((service, index) => (
          <div className="service-card" key={index}>
            <span className="service-icon">{service.icon}</span>
            <div className="service-title">{service.title}</div>
          </div>
        ))}
      </div>
      
      {showAll && (
        <div className="additional-services">
          {additionalServices.map((service, index) => (
            <div className="service-card additional" key={`additional-${index}`}>
              <div className="service-title">{service}</div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        className="show-more-btn"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Show Less' : 'Show More Services'}
      </button>
    </section>
  );
};

export default Services;