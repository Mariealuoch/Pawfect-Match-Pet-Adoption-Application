import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import LoggedNav from './LoggedNav';
import Footer from './Footer';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import {FaPaw } from 'react-icons/fa';


function CreateUser() {
  const initialValues = {
    username: '',
    password: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false); // State to track sign-up success

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: values.username, password: values.password, email: values.email }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          return r.json();
        } else {
          return r.json().then((err) => {
            throw new Error(err.errors);
          });
        }
      })
      .then((user) => {
        setSubmitting(false);
        setSignUpSuccess(true); // Set success state
        console.log(user);
      })
      .catch((error) => {
        setSubmitting(false);
        setErrors(error.message || 'An error occurred');
      });
  };

  return (
    <div>
       <nav className="navbar navbar-expand-lg custom-navcolor ">
        <a className="navbar-brand" href="#">
        <Link className='link' to={"/"}><h2 className="ms-3 main-text-color">Pawfect Match<FaPaw /></h2></Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
  <div className="navbar-nav">
    {/* This div is empty intentionally to create spacing on the left side */}
  </div>
  
</div>

        </nav>
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="form-container">
          <h2 className='main-text-color text-center'>Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field type="text" id="username" name="username" className="form-control reduced-width" />
                  <ErrorMessage name="username" component="div" className="error" style={{ color: 'red' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field type="text" id="password" name="password" className="form-control reduced-width" />
                  <ErrorMessage name="password" component="div" className="error" style={{ color: 'red' }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field type="email" id="email" name="email" className="form-control reduced-width" />
                  <ErrorMessage name="email" component="div" className="error" style={{ color: 'red' }} />
                </div>

                <button type="submit" className="btn logout-btn" disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading ? 'Submitting...' : 'Sign Up'}
                </button>

                {errors && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errors}
                  </div>
                )}
              </Form>
            )}
          </Formik>
          {signUpSuccess && (
            <div className="mt-3 text-center">
              <p>Sign up successful! You can now login.</p>
              <Link to="/">
                <button className="btn logout-btn">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateUser;
