import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:4000';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/reservations`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/reservations/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deletereservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
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

export default deletereservationsSlice.reducer;
