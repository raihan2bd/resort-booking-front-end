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
  async ({token, formData}, { rejectWithValue }) => {
    try {
      console.log('I am working', token)
      const config = {
        headers: {
          Authorization: token
        }
      }

      const booking = {
        address: formData.address,
        start_date: formData.startDate,
        end_date: formData.endDate,
        resort_id: formData.resort_id
      }

      console.log("form", formData)
      console.log("booking data", booking)
      const res = await axios.post('/bookings', booking, config);
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
