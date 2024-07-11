import React, { useEffect, useState } from 'react';
import { FaHome, FaListUl, FaInfoCircle, FaEnvelope, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import './HomePage.css'; 

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
   '/images/_ (7).jpeg',
   '/images/15cbd6c8-ddc0-4bb7-8df6-106ed00124fd.jpeg',
   '/images/72bd9641-1ab9-4c75-aba5-f76b7f8c3f25.jpeg',
   '/images/cat and dogg🥰.jpeg',
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1 className="logo">PAWFECT MATCH <FaPaw /></h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/home"><FaHome /> Home</Link></li>
              <li><Link to="/Pawlist"><FaListUl /> Pawlist</Link></li>
              <li><Link to="/aboutus"><FaInfoCircle /> About Us</Link></li>
              <li><Link to="/login"><FaRegUser /> User</Link></li>
              <li><Link to="/contacts"><FaEnvelope /> Contact Us</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className='adoption-container'>
        <p className='adoption-text'>ADOPT. DON'T SHOP.</p>
        </div>
      <div className="carousel">
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
