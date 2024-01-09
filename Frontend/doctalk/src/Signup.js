import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessages({ message: "Please fill in all fields." });
    } else if (password !== confirmPassword) {
      setErrorMessages({ message: "Passwords do not match." });
    } else {
      axios.post('http://127.0.0.1:5000/register', formData)
        .then(response => {
          console.log('You have successfully signed up!!:', response.data);
          setIsSubmitted(true);

          // Redirect to login page after successful signup
          navigate('/login');
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderErrorMessage = () => {
    return <div className="error">{errorMessages.message}</div>;
  };

  const renderForm = (
     <div className="flex justify-center items-center h-screen">
    <form onSubmit={handleSubmit} className=" p-6 shadow-lg bg-white rounded font-serif w-80 h-auto">
      <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="h-10 border border-gray-300 px-2"
        />
      </div>
      <div className="input-container font-serif">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="h-10 border border-gray-300 px-2"
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="h-10 border border-gray-300 px-2"
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="h-10 border border-gray-300 px-2"
        />
      </div>
      <div className="flex justify-center">
      <button
        type="submit"
        className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
      {renderErrorMessage()}
      </div>
    </form>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-gray-100">
      {isSubmitted ? (
        <div>User is successfully signed up!</div>
      ) : (
        renderForm
      )}
    </div>
  );
}

export default SignUp;



