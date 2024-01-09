import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./Login.css";

function Login({ setLoggedIn, setEmail }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  

  // User Login info
  const database = [
    {
      email: "user1@example.com",
      password: "pass1"
    },
    {
      email: "user2@example.com",
      password: "pass2"
    }
  ];

  const errors = {
    email: "invalid email",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('pass')
    };

    // Send user credentials to the server for login
    axios.post('http://127.0.0.1:5000/login', userData)
      .then(response => {
        // Handle successful login response
        console.log('User logged in:', response.data);
        setIsSubmitted(true); // Update state to show success message
      })
      .catch(error => {
        // Handle error
        console.error('Login error:', error);
        // You can set error messages or perform other error handling here
      });
      setLoggedIn(true); // Update authentication status
    setEmail(formData.get('email')); // Update user's email

    // Redirect to the dashboard after successful login
    navigate('/dashboard');
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
    const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;


