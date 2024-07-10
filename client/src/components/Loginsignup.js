import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Loginsignup.css';
import ErrorBox from './ErrorBox';  // Import the ErrorBox component

import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("LOGIN");

  useEffect(() => {
    document.body.style.overflow = action === "SIGN UP" ? 'hidden' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [action]);

  const validationSchema = Yup.object({
    username: action === "SIGN UP" ? Yup.string().required('Username is required') : Yup.string(),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="inputs">
            {action === "LOGIN" ? null : (
              <div className="input">
                <img src={user_icon} alt="User Icon" />
                <Field type="text" name="username" placeholder="Username" />
                {errors.username && touched.username ? (
                  <ErrorBox message={errors.username} />
                ) : null}
              </div>
            )}
            
            <div className="input">
              <img src={email_icon} alt="Email Icon" />
              <Field type="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <ErrorBox message={errors.email} />
              ) : null}
            </div>
            <div className="input">
              <img src={password_icon} alt="Password Icon" />
              <Field type="password" name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <ErrorBox message={errors.password} />
              ) : null}
            </div>
            <div className="submit-container">
              <button type="submit" disabled={isSubmitting} className="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

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