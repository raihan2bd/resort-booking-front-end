import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import MainPage from './pages/MainPage';

const App = () => (
  <>
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/signIn" element={<SignInForm />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  </>
);

export default App;
