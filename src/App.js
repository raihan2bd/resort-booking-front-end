import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { retriveToken } from './redux/auth/authSlice';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';

// set base api url
axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retriveToken());
  }, [dispatch]);

  if (isAuth) {
    console.log('you are logged in!');
  }

  return (
    <>
      <Routes>
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/login" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
