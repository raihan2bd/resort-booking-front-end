import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authSlice';
import myBookings from './my-bookings/my-bookings';
import deleteReservationsReducer from './delete-reservation/deleteReservationSlice';

const store = configureStore({
  reducer: { myBookings, auth, deleteReservationsReducer },
});

export default store;
