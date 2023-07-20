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
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Email:</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <h2>Password:</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {signInError && <p>{signInError}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
