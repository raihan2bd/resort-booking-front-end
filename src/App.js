import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SignInForm';
import DeleteReservation from './pages/DeleteReservation';

const App = () => (
  <>
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/delete-reservations" element={<DeleteReservation />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/signIn" element={<SignInForm />} />
    </Routes>
  </>
);

export default App;
