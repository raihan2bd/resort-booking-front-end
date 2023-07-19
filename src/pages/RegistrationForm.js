import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth', {
        user: {
          name: fullName,
          email,
          password,
          password_confirmation: password,
        },
      });

      console.log('Registration successful!', response.data);
    } catch (error) {
      console.error('Registration failed.', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Full Name:</h2>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
