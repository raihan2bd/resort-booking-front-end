import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { retriveToken } from './redux/auth/authSlice';

import AddResort from './pages/AddResort';
import MyBookingsPage from './pages/BookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import Reserve from './components/Reserve';
import DeleteResort from './pages/DeleteResort';
import MainPage from './pages/MainPage';
import Spinner from './components/UI/Spinner';
import Layout from './components/Layout/Layout';
import './components/Layout/Layout.css';
import ResortDetailsPage from './pages/ResortDetailsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import NotFoundPage from './pages/NotFoundPage';

// set base api url
axios.defaults.baseURL = 'https://resort-booking-drdt.onrender.com';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retriveToken());
  }, [dispatch]);

  if (auth.loadingAuth) {
    return <Spinner />;
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
          <Route path="/details/:resortId" element={<ResortDetailsPage />} />

          <Route
            path="/signup"
            element={!auth.isAuth ? <RegistrationForm /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth.isAuth ? <SignInForm /> : <Navigate to="/" />}
          />

          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/add-booking" element={auth.isAuth ? <Reserve /> : <Navigate to="/login" />} />
          <Route path="/add-booking/:resortId" element={auth.isAuth ? <Reserve /> : <Navigate to="/login" />} />
          <Route path="/delete-resort" element={auth.role === 'admin' ? <DeleteResort /> : <Navigate to="/access-denied" />} />
          <Route path="/add_resort" element={auth.role === 'admin' ? <AddResort /> : <Navigate to="/access-denied" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Layout>
  );
};

export default App;
