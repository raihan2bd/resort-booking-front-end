import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import myBookings from './my-bookings/my-bookings';
import resortsSlice from './resorts/resortsSlice';
import reservationsReducer from './delete-reservation/deleteReservationSlice';

const store = configureStore({
  reducer: { myBookings, auth, resortsSlice, reservationsReducer},
});

export default store;
