import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const RESORTS = 'resorts'

const initialState = {
  resorts: [],
  loading: true,
  error: false
};

export const fetchResorts = createAsyncThunk(
  RESORTS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/resorts');
      console.log(res, 'the response')
      return { resorts: res.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  },

  
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${RESORTS}/pending`:
      return {
        loading: true,
        resorts: [],
        error: false
      };
    case `${RESORTS}/fulfilled`:
      return {
        loading: false,
        resorts: action.payload,
        error: false
      };
    case `${RESORTS}rejected`:
      return {
        loading: false,
        resorts: [],
        error: true
      };
    default:
      return { ...state };
  }
};
