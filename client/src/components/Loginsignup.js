import React, { useState, useEffect } from 'react';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import './HomePage.css';

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
    <div className="container-login">
      <div className="header-login">
        <div className="text-login">{action}</div>
        <div className="underline-login"></div>
      </div>
      
      <div className="inputs-login">
        {action === "LOGIN" ? null : (
          <div className="input-login">
            <img src={user_icon} alt="User Icon" />
            <input type="text" placeholder="Username" />
          </div>
        )}
        
        <div className="input-login">
          <img src={email_icon} alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-login">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div className="submit-container-login">
        <div 
          className={action === "LOGIN" ? "submit gray" : "submit"} 
          onClick={() => setAction(action === "LOGIN" ? "SIGN UP" : "LOGIN")}
        >
          {action === "LOGIN" ? "SIGN UP" : "LOG IN"}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
