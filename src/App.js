import { Routes, Route } from 'react-router-dom';

import MyBookingsPage from './pages/MyBookingsPage';

const App = () => (
  <>
    <Routes>
      <Route path="/my-bookings" element={<MyBookingsPage />} />
    </Routes>
  </>
);

export default App;
