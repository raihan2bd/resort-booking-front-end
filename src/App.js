import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import ReservationForm from './components/ReservationForms';

const App = () => (
  <>
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/signIn" element={<SignInForm />} />
      <Route path="/Reservation-form" element={<ReservationForm />} />
    </Routes>
  </>
);

export default App;
