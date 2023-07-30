import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutAction } from '../auth/authSlice';
import { uiActions } from '../ui/uiSlice';

export const fetchBookings = createAsyncThunk(
  'bookings/my-bookings',
  async ({ token }, { dispatch }) => {
    try {
      dispatch(uiActions.pendingState());

      const headers = {
        Authorization: token,
      };
      const response = await axios.get('/bookings', { headers });
      if (response.status !== 200) {
        throw new Error('Some thing went wrong!');
      }
      const result = response.data;
      dispatch(uiActions.fulfilledState());
      return {
        bookings: result,
      };
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logoutAction());
      }
      const errMsg = error.response.data.error ? error.response.data.error : 'Something went wrong. Please try again';
      dispatch(uiActions.rejectedState(errMsg));
      return null;
    }
  },
);

export const createBooking = createAsyncThunk(
  'bookings/create',
  async ({ token, formData }, { dispatch }) => {
    try {
      dispatch(uiActions.pendingState());
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const booking = {
        address: formData.address,
        start_date: formData.startDate,
        end_date: formData.endDate,
        resort_id: formData.resort_id,
      };

      await axios.post('/bookings', booking, config);
      dispatch(uiActions.fulfilledState('New booking is added successfully!'));
      return { redirect: true };
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logoutAction());
      }
      const errMsg = error.response.data.error ? error.response.data.error : 'Something went wrong. Please try again';
      dispatch(uiActions.rejectedState(errMsg));
      return null;
    }
  },

);

const initialState = {
  bookings: [],
  redirect: true,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchMyBookings.pending, (state) => {
    //   const updatedState = {
    //     ...state,
    //     myBookings: [],
    //     loading: true,
    //     error: null,
    //   };
    //   return updatedState;
    // });

    builder.addCase(fetchBookings.fulfilled, (state, { payload }) => {
      if (!payload) {
        return { ...initialState };
      }

      const updatedState = {
        ...state,
        bookings: payload.bookings,
        redirect: false,
      };
      return updatedState;
    });

    builder.addCase(createBooking.fulfilled, (state, { payload }) => {
      if (!payload) {
        return { ...initialState };
      }

      // const updatedBookings = [...state.bookings, {...payload.booking}]

      // const updatedState = {
      //   ...state,
      //   bookings: updatedBookings,
      //   redirect: true,
      // };
      return { ...state, redirect: payload.redirect };
    });
  },
});

export default bookingsSlice.reducer;
