import React, { useState } from 'react';
import Loginsignup from './components/Loginsignup';
import './App.css';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (

    <div>
        <Loginsignup/>
      </div>
  );
};

export default App;
 