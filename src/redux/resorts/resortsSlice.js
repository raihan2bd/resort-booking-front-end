import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutAction } from '../auth/authSlice';

const initialState = {
  resorts: [],
  loading: true,
  hasError: false,
  message: null,
  redirect: false,
};

export const fetchResorts = createAsyncThunk(
  'resorts/all-resorts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/resorts');
      return { resorts: res.data };
    } catch (error) {
      return rejectWithValue('Something went wrong! Please try again!');
    }
  },

);

export const addNewResort = createAsyncThunk('resorts/new-resort', async ({data, token}, {rejectWithValue, dispatch}) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.post('/resorts', { ...data }, config);
    const resort =  {
      id: response.data.id,
      ...data
    }
    return {message: 'Resort is added successfully!', resort}
  } catch (error) {
    let errMsg = 'Something went wrong! please try again!'
    if (error.response.status === 401) {
      dispatch(logoutAction())
      errMsg = 'Please login to perform this action.'
    } else if (error.response.status === 403) {
      errMsg = 'Access denied. You don\'t have permission to perform this action'
    }
    rejectWithValue(errMsg)
  }

});

export const deleteReosrt = createAsyncThunk('resorts/delete-resort', async ({resortId, token}, {dispatch, rejectWithValue}) => {
  const headers = {
    Authorization: token,
  };
  try {
    await axios.delete(`/resorts/${resortId}`, { headers });
    return {resortId, message: 'Resort is deleted successfully'}

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
    rejectWithValue(errMsg)
  }
});

const resortSlice = createSlice({
  name: 'resorts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResorts.pending, () => ({
      loading: true,
      resorts: [],
      hasError: false,
      message: null,
      redirect: false,
    }));

    builder.addCase(fetchResorts.fulfilled, (state, action) => {
      const updatedState = {
        ...state,
        loading: false,
        hasError: false,
        message: 'Resorts is successfully fetched',
        resorts: action.payload,
        redirect: false,
      };
      return updatedState;
    });

    builder.addCase(fetchResorts.rejected, (state, action) => {
      const updatedState = {
        ...state,
        resorts: [],
        loading: false,
        hasError: true,
        message: action.payload,
        redirect: false,
      };
      return updatedState;
    });

    // add new resort reducer
    builder.addCase(addNewResort.pending, () => {
      return {
        ...initialState,
        loading: true,
      }
    });

    builder.addCase(addNewResort.fulfilled, (state, {payload}) => {
      const updatedResorts = [...state.resorts, {...payload.resort}]
      return {...initialState, resorts: updatedResorts, message: payload.message}
    });

    builder.addCase(addNewResort.rejected, (state, action) => {
      return {
        ...initialState,
        resorts: state.resorts,
        hasError: true,
        message: action.payload
      }
    });

    // delete resort
    builder.addCase(deleteReosrt.pending, () => {
      return {...initialState, loading: true}
    });

    builder.addCase(deleteReosrt.fulfilled, (state, {payload}) => {
      const updatedResorts = state.resorts.filter((resort) => resort.id !== payload.resortId);

      return {...initialState, resorts: updatedResorts}
    });

    builder.addCase(deleteReosrt.rejected, (state, action) => {
      return {
        ...initialState,
        resorts: state.resorts,
        loading: false,
        hasError: true,
        message: action.payload,
      }
    });
  },
});

export default resortSlice.reducer;
