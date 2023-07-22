import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutAction } from '../auth/authSlice';

export const fetchMyBookings = createAsyncThunk(
  'bookings/my-bookings',
  async ({ token }, { dispatch }) => {
    try {
      const headers = {
        Authorization: token,
      };
      const response = await axios.get('/bookings', { headers });
      if (response.status !== 200) {
        throw new Error('Some thing went wrong!');
      }
      const result = response.data;

      return {
        myBookings: result,
        loading: false,
        error: null,
      };
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logoutAction());
      }
      return { error: error.response.data.error ? error.response.data.error : 'Something went wrong. Please try again', myBookings: [], loading: false };
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  myBookings: [],
};

const myBookingsSlice = createSlice({
  name: 'my-reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyBookings.pending, (state) => {
      const updatedState = {
        ...state,
        myBookings: [],
        loading: true,
        error: null,
      };
      return updatedState;
    });

    builder.addCase(fetchMyBookings.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        loading: payload.loading,
        error: payload.error,
        myBookings: payload.myBookings,
      };
      return updatedState;
    });

    // builder.addCase(fetchMyBookings.rejected, (state, { payload }) => {
    //   const updatedState = {
    //     ...state,
    //     loading: payload.loading,
    //     error: payload.error,
    //     myBookings: payload.myBookings,
    //   };
    //   return updatedState;
    // });
  },
});

export default myBookingsSlice.reducer;
