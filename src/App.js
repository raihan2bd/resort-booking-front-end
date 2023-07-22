import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import Layout from './components/Layout/Layout';
import './components/Layout/Layout.css';

const App = () => (
  <>
    <Layout />
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/signIn" element={<SignInForm />} />
    </Routes>
  </>
);

export default App;
