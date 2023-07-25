import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchLogin } from '../redux/auth/authSlice';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuth, message } = auth;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchLogin({
      email,
      password,
    }));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="container mt-4">
        <h2 className="text-center my-3">Login</h2>
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
        {message && <p className="text-danger">{message}</p>}
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <div className="p-3 mt-3 text-center">
        <p className="fs-6 p-3 shadow">
          If you don&apos;t have any account please
          <Link className="ps-2" to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
