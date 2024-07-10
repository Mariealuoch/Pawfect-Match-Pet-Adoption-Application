import React from 'react';
import './ErrorBox.css';

const ErrorBox = ({ message }) => {
  return message ? (
    <div className="error-box">
      {message}
    </div>
  ) : null;
};

export default ErrorBox;
