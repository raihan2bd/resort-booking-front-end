import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
    const response = await axios.get('/reservations', { withCredentials: true });
    return response.data;
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (bookingId) => {
    const response = await axios.delete(`/reservations/${bookingId}`, { withCredentials: true });
    return response.data;
});

const deleteReservationSlice = createSlice({
    name: 'reservations',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReservations.fulfilled, (state, action) => {
          return action.payload;
        })
        .addCase(deleteReservation.fulfilled, (state, action) => {
          return state.filter((reservation) => reservation.id !== action.payload.id);
        });
    },
  });
  
  export default deleteReservationSlice.reducer;