import React from 'react';
import { FaHome, FaListUl, FaInfoCircle, FaEnvelope, FaRegUser, FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GridSlide from './GridSlide';
import './HomePage.css'; 

const HomePage = () => {
  const images = [
    require('../images/_ (7).jpeg'),
    require('../images/15cbd6c8-ddc0-4bb7-8df6-106ed00124fd.jpeg'),
    require('../images/72bd9641-1ab9-4c75-aba5-f76b7f8c3f25.jpeg'),
    require('../images/cat and dogg🥰.jpeg'),
    require('../images/4340b660-8182-4063-b1da-92dc2c6a4f04.jpeg'), 
    require('../images/cat and dogg🥰.jpeg'),
    require('../images/_ (11).jpeg'),
    require('../images/_ (10).jpeg'),
    require('../images/_ (13).jpeg'),
    require('../images/Los nombres de mascotas más populares.jpeg'),
    require('../images/Paw Print.jpeg'),
    require('../images/_ (14).jpeg'),
    require('../images/_ (16).jpeg'),
    require('../images/_ (15).jpeg'),
    require('../images/14 Dog Portraits That Show The Adorably Human Side Of Pups.jpeg'),

  ];

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
      <div className='adoption-container d-flex'>
        <p className='adoption-text '>ADOPT. DON'T SHOP.</p>
      </div>
      <GridSlide images={images} />
    </div>
  );
};

export default HomePage;
