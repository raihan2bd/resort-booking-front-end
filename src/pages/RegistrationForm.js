import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignup } from '../redux/auth/authSlice';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(fetchSignup({
      user: {
        name: fullName,
        email,
        password,
        password_confirmation: password,
      },
    }));
  };

  useEffect(() => {
    if (auth.token) {
      navigate('/login', { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div className="form-container shadow mt-4 p-3">
      <form onSubmit={handleSubmit} className="container mt-4">
        <h2 className="text-center my-3">Sign UP</h2>
        <div className="mb-3">
          <h2 htmlFor="fullName" className="form-label">Full Name:</h2>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
        {auth.message && <p className="text-danger">{auth.message}</p>}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="p-3 mt-3 text-center">
        <p className="fs-6 p-3 shadow">
          If you already have an account please
          <Link className="ps-2" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
