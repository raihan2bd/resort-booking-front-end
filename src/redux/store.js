import { configureStore } from '@reduxjs/toolkit';
import ui from './ui/uiSlice';
import auth from './auth/authSlice';
import bookings from './bookings/bookingsSlice';
import resorts from './resorts/resortsSlice';

const store = configureStore({
  reducer: {
    ui, bookings, auth, resorts,
  },
});

export default store;
