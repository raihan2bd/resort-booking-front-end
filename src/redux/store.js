import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import myBookings from './my-bookings/my-bookings';
import reservationsReducer from './delete-reservation/deleteReservationSlice';

const store = configureStore({
  reducer: { myBookings, auth, reservationsReducer },
});

export default store;
