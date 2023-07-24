import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import myBookings from './my-bookings/my-bookings';
import resortsSlice from './resorts/resortsSlice';

const store = configureStore({
  reducer: { myBookings, auth, resortsSlice },
});

export default store;
