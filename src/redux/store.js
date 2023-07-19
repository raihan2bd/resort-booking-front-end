import { configureStore } from '@reduxjs/toolkit';

import myBookings from './my-bookings/my-bookings';

const store = configureStore({
  reducer: { myBookings },
});

export default store;
