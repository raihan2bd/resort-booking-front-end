import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';
import RegistrationForm from './pages/RegistrationForm';

const App = () => (
  <>
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  </>
);

export default App;
