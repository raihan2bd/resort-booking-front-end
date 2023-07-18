import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myReservations: [],
};

const myReservationsSlice = createSlice({
  name: 'my-reservations',
  initialState,
  reducers: {},
});

export default myReservationsSlice.reducer;
