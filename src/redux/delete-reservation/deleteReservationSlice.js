import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { retriveToken } from '../auth/authSlice';

export const fetchReservations = createAsyncThunk('bookings/fetchReservations', async (_, { rejectWithValue, dispatch }) => {
  try {
    // Check if user is loged in and retrieve the token
    const authResponse = await dispatch(retriveToken());
    const { token } = authResponse.payload;

    // Add token to the header
    const headers = {
      Authorization: token,
    };

    const response = await axios.get('/bookings', { headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteReservation = createAsyncThunk('bookings/deleteReservation', async (userId, { rejectWithValue, dispatch }) => {
  try {
    const authResponse = await dispatch(retriveToken());
    const { token } = authResponse.payload;

    const headers = {
      Authorization: token,
    };

    const response = await axios.delete(`/bookings/${userId}`, { headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [
      // { id: 1, name: 'Reservation 1' },
      // { id: 2, name: 'Reservation 2' },
      // { id: 3, name: 'Reservation 3' },
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
