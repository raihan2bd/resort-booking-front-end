import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { retriveToken } from './redux/auth/authSlice';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import MainPage from './pages/MainPage';
import AuthSpinner from './components/UI/AuthSpinner';
import Layout from './components/Layout/Layout';
import './components/Layout/Layout.css';

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
    <Layout>
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
      </Routes>
    </Layout>
  );
};

export default App;
