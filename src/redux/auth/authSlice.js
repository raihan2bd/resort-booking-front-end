import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  localStorage.removeItem('expirationTime');

  return {
    isAuth: false,
    token: null,
    userId: null,
    role: null,
    expirationTime: null,
    message: null,
  };
};

export const fetchSignup = createAsyncThunk(
  'auth/sign-up',
  async ({ user }) => {
    console.log(user);
    try {
      const response = await axios.post('/signup', { user: { ...user } });
      console.log(response);
      return {
        token: response.headers.authorization,
      };
    } catch (error) {
      console.log(error);
      return {
        token: null,
      };
    }
  },
);

export const fetchLogout = createAsyncThunk(
  'auth/fetch-logout',
  async ({ token }) => {
    try {
      const headers = {
        Authorization: token,
      };
      await axios.delete('/logout', { headers });
    } catch (error) {
      console.log(error);
    }

    return logout();
  },
);

export const retriveToken = createAsyncThunk(
  'auth/retrive-token', () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      return logout();
    }

    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const expirationTime = localStorage.getItem('expirationTime');

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (expirationTime < currentTimestamp + 300) {
      return logout();
    }

    return {
      isAuth: true,
      token,
      userId,
      role,
      expirationTime,
      message: null,
    };
  },
);

export const fetchLogin = createAsyncThunk(
  'auth/Login',
  async ({ email, password }) => {
    try {
      const response = await axios.post('/login', {
        user: {
          email,
          password,
        },
      });

      if (response.status !== 200) {
        throw new Error({
          response: {
            data: 'Invalid email or password. Please try again.',
          },
        });
      }

      const { data } = response.data;
      const decoded = jwtDecode(response.headers.authorization);

      localStorage.setItem('token', response.headers.authorization);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);
      localStorage.setItem('expirationTime', decoded.exp);

      return {
        isAuth: true,
        token: response.headers.authorization,
        userId: data.id,
        role: data.role,
        expirationTime: decoded.exp,
        message: 'You are successfully logged In',
      };
    } catch (error) {
      return {
        isAuth: false,
        token: null,
        userId: null,
        role: null,
        expirationTime: null,
        message: `${
          error.response.data
            ? error.response.data
            : 'Something went wrong. Plese try again.'
        }`,
      };
    }
  },
);

const initialState = {
  loadingAuth: true,
  isAuth: false,
  token: null,
  userId: null,
  role: null,
  expirationTime: null,
  message: null,
};

const myAuthSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignup.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        token: payload.token,
      };

      return updatedState;
    });

    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        isAuth: payload.isAuth,
        token: payload.token,
        userId: payload.userId,
        role: payload.role,
        expirationTime: payload.expirationTime,
        message: payload.message,
      };

      return updatedState;
    });

    builder.addCase(fetchLogout.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        isAuth: payload.isAuth,
        token: payload.token,
        userId: payload.userId,
        role: payload.role,
        expirationTime: payload.expirationTime,
        message: payload.message,
      };
      return updatedState;
    });

    builder.addCase(retriveToken.fulfilled, (state, { payload }) => {
      const updatedState = {
        ...state,
        loadingAuth: false,
        isAuth: payload.isAuth,
        token: payload.token,
        userId: payload.userId,
        role: payload.role,
        expirationTime: payload.expirationTime,
        message: payload.message,
      };
      return updatedState;
    });
  },
});

export default myAuthSlice.reducer;
