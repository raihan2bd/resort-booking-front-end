import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogin = createAsyncThunk(
  'auth/Login',
  async ({ email, password }) => {
    try {
      await axios.post('http://localhost:4000/auth/sign_in', {
        user: {
          email,
          password,
        },
      });
      console.log('good');
      return { auth: true };
    } catch (error) {
      console.log('Invalid email or password. Please try again.');
      return { auth: false };
    }
  },
);

const initialState = {
  isAuth: false,
};

const myAuthSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        isAuth: payload,
      };
      return updatedState;
    });
  },
});

export default myAuthSlice.reducer;
