import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutAction } from '../auth/authSlice';
import { uiActions } from '../ui/uiSlice';

const initialState = {
  resorts: [],
  redirect: false,
};

export const fetchResorts = createAsyncThunk(
  'resorts/all-resorts',
  async (_, { dispatch }) => {
    try {
      dispatch(uiActions.pendingState());

      const res = await axios.get('/resorts');
      dispatch(uiActions.fulfilledState());
      return { resorts: res.data };
    } catch (error) {
      dispatch(uiActions.rejectedState('Something went wrong. Please try again'));
      return { resorts: [] };
    }
  },

);

export const addNewResort = createAsyncThunk('resorts/new-resort', async ({ data, token }, { dispatch }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch(uiActions.pendingState());
    const response = await axios.post('/resorts', { ...data }, config);
    const resort = {
      id: response.data.id,
      ...data,
    };

    dispatch(uiActions.fulfilledState('Resort is added successfully!'));

    return { resort };
  } catch (error) {
    let errMsg = 'Something went wrong! please try again!';
    if (error.response.status === 401) {
      dispatch(logoutAction());
      errMsg = 'Please login to perform this action.';
    } else if (error.response.status === 403) {
      errMsg = 'Access denied. You don\'t have permission to perform this action';
    }
    dispatch(uiActions.rejectedState(errMsg));
    return null;
  }
});

export const deleteReosrt = createAsyncThunk('resorts/delete-resort', async ({ resortId, token }, { dispatch }) => {
  const headers = {
    Authorization: token,
  };
  try {
    dispatch(uiActions.pendingState());
    await axios.delete(`/resorts/${resortId}`, { headers });
    dispatch(uiActions.fulfilledState('Resort is deleted successfully'));
    return { resortId };
  } catch (error) {
    let errMsg;
    if (error.response.status === 401) {
      errMsg = 'Unauthorize user! Please login before this action.';
      dispatch(logoutAction());
    } else if (error.response.status === 403) {
      errMsg = "You don't have permission to delete the resort!";
    } else {
      errMsg = 'Something went wrong! Please try again.';
    }
    dispatch(uiActions.rejectedState(errMsg));
    return null;
  }
});

const resortSlice = createSlice({
  name: 'resorts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResorts.fulfilled, (state, action) => {
      const updatedState = {
        ...state,
        resorts: action.payload.resorts,
        redirect: false,
      };
      return updatedState;
    });

    builder.addCase(addNewResort.fulfilled, (state, { payload }) => {
      if (!payload) {
        return { ...state, redirect: false };
      }

      const updatedResorts = [...state.resorts, { ...payload.resort }];
      return { ...initialState, resorts: updatedResorts, redirect: true };
    });

    builder.addCase(deleteReosrt.fulfilled, (state, { payload }) => {
      if (!payload) {
        return { ...state, redirect: false };
      }
      const updatedResorts = state.resorts.filter((resort) => resort.id !== payload.resortId);

      return { ...initialState, resorts: updatedResorts, redirect: false };
    });
  },
});

export default resortSlice.reducer;
