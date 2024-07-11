import React from 'react';
import { FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaInstagram, FaGit } from 'react-icons/fa';
import './Contacts.css'
const Contacts = () => {
  return (
    <div className='contacts-section'>
    <div className="contact-us">
      <h2>Contact Us</h2>
      <ul className="contact-list">
        <li>
          <FaEnvelope /> Email: aluochmarion7@gmail.com
        </li>
        <li>
          <FaPhone /> Phone: +254724681921
        </li>
        <li>
          <FaTwitter /> Twitter: <a href="https://twitter.com/example">@example</a>
        </li>
        <li>
          <FaFacebook /> Facebook: <a href="https://facebook.com/example">Facebook</a>
        </li>
        <li>
          <FaInstagram /> Instagram: <a href="https://instagram.com/a_luoch">@a_luoch</a>
        </li>
        <li>
          <FaGit /> Git: <a href="https://github.com/Mariealuoch">Marion Aluoch</a><br></br>
          <FaGit /> Git: <a href="https://github.com/bowenSteve">Steve Bowen</a><br></br>
          <FaGit /> Git: <a href="https://github.com/Abdirizakgulet">Abdirizak</a><br></br>
          <FaGit /> Git: <a href="https://github.com/AbdulazizAbdi">Abdilaziz Abdi</a><br></br>
          <FaGit /> Git: <a href="https://github.com/denis-kinyanjui">Denis Kinyanjui</a><br></br>


        </li>
      </ul>
    </div>
    <div className="contacts-image"></div>
    </div>
  );
};

export default Contacts;
