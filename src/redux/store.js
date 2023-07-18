import { configureStore } from '@reduxjs/toolkit'

import myReservations from './my-reservations/my-reservations';

const store = configureStore({
  reducer: { myReservations },
});

export default store;