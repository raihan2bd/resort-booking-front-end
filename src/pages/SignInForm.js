import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', {
        user: {
          email,
          password,
        },
      });

      // Handle success response (you can add your own logic here)
      console.log('Sign-in successful!', response.data);
    } catch (error) {
      // Handle error response
      console.error('Sign-in failed.', error.response.data);
      setSignInError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <h2 htmlFor="email" className="form-label">Email:</h2>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <h2 htmlFor="password" className="form-label">Password:</h2>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {signInError && <p className="text-danger">{signInError}</p>}
      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default SignInForm;
