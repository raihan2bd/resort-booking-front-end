import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BOOKINGS = 'bookings'

const initialState = {
  bookings: [],
  loading: true,
  error: false
};

export const createBookings = createAsyncThunk(
  BOOKINGS,
  async (token, bookings, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      const res = await axios.post('/bookings', config, bookings);
      return { bookings: res.data };
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  },

  
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${BOOKINGS}/pending`:
      return {
        loading: true,
        bookings: [],
        error: false
      };
    case `${BOOKINGS}/fulfilled`:
      return {
        loading: false,
        bookings: action.payload,
        error: false
      };
    case `${BOOKINGS}rejected`:
      return {
        loading: false,
        bookings: [],
        error: true
      };
    default:
      return { ...state };
  }
};
