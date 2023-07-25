import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { retriveToken } from './redux/auth/authSlice';

import AddResort from './pages/AddResort';
import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import Reserve from './components/Reserve';
import DeleteResort from './pages/DeleteResort';
import MainPage from './pages/MainPage';
import AuthSpinner from './components/UI/AuthSpinner';
import Layout from './components/Layout/Layout';
import './components/Layout/Layout.css';
import ResortDetailsPage from './pages/ResortDetailsPage';
// set base api url
axios.defaults.baseURL = 'https://resort-booking-back-end.onrender.com/';

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
      <>
        <Routes>
          <Route path="/" element={<MainPage />} />
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
          <Route path="/reservation_form" element={auth.isAuth ? <Reserve /> : <Navigate to="/login" />} />
          <Route path="/add-booking/:resortId" element={auth.isAuth ? <Reserve /> : <Navigate to="/login" />} />
          <Route path="/delete-resort" element={auth.isAuth ? <DeleteResort /> : <Navigate to="/login" />} />
          <Route path="/add-class" element={auth.isAuth ? <AddResort /> : <Navigate to="/login" />} />
          <Route path="/details/:resortId" element={<ResortDetailsPage />} />
        </Routes>
      </>
    </Layout>
  );
};

export default App;
