import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import myBookings from './my-bookings/my-bookings';

const store = configureStore({
  reducer: { myBookings, auth },
});

export default store;
