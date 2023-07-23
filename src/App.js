import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { retriveToken } from './redux/auth/authSlice';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import DeleteReservation from './pages/DeleteReservation';
import MainPage from './pages/MainPage';
import AuthSpinner from './components/UI/AuthSpinner';

// set base api url
axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retriveToken());
  }, [dispatch]);

  if (auth.loadingAuth) {
    return <AuthSpinner />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/my-bookings"
          element={auth.isAuth ? <MyBookingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!auth.isAuth ? <RegistrationForm /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!auth.isAuth ? <SignInForm /> : <Navigate to="/" />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/delete-reservations" element={<DeleteReservation />} />
      </Routes>
    </>
  );
};

export default App;
