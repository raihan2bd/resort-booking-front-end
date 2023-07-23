import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:4000';

export const fetchReservations = createAsyncThunk('bookings/fetchReservations', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/bookings`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteReservation = createAsyncThunk('bookings/deleteReservation', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/bookings/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [
      { id: 1, name: 'Reservation 1' },
      { id: 2, name: 'Reservation 2' },
      { id: 3, name: 'Reservation 3' },
    ],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload.id);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default reservationsSlice.reducer;
