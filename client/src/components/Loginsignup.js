import React, { useState, useEffect } from 'react';

import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import './HomePage.css'

const LoginSignup = () => {
  const [action, setAction] = useState("LOGIN");

  useEffect(() => {
    // Disable scrolling when the component mounts and action changes
    document.body.style.overflow = action === "SIGN UP" ? 'hidden' : 'auto';

    // Clean up function to reset the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [action]);

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputs">
        {action === "LOGIN" ? null : (
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input type="text" placeholder="Username" />
          </div>
        )}
        
        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div className="submit-container">
        <div 
          className={action === "LOGIN" ? "submit gray" : "submit"} 
          onClick={() => setAction("SIGN UP")}
        >
          SIGN UP
        </div>
        <div 
          className={action === "SIGN UP" ? "submit gray" : "submit"} 
          onClick={() => setAction("LOGIN")}
        >
          LOGIN
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
