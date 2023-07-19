import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:4000';

export const fetchMyBookings = createAsyncThunk(
  'bookings/my-bookings',
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/my-bookings`);
      if (response.status !== 200) {
        throw new Error('Some thing went wrong!');
      }
      const result = response.json();

      return {
        myBookings: result.data,
        loading: false,
        error: null,
      };
    } catch (err) {
      return {
        loading: false,
        error: null,
        myBookings: [
          {
            id: 1,
            name: 'Lorem ipsum 1',
            address: 'Khulna, Satkhira',
            start_date: '2023-07-18',
            end_date: '2023-07-28',
          },
          {
            id: 2,
            name: 'Lorem ipsum 2',
            address: 'Khulna, Satkhira',
            start_date: '2023-07-18',
            end_date: '2023-07-28',
          },
          {
            id: 3,
            name: 'Lorem ipsum 3',
            address: 'Khulna, Satkhira',
            start_date: '2023-07-18',
            end_date: '2023-07-28',
          },
          {
            id: 4,
            name: 'Lorem ipsum 4',
            address: 'Khulna, Satkhira',
            start_date: '2023-07-18',
            end_date: '2023-07-28',
          },
          {
            id: 5,
            name: 'Lorem ipsum 5',
            address: 'Khulna, Satkhira',
            start_date: '2023-07-18',
            end_date: '2023-07-28',
          },
        ],
      };
      // return thunkAPI.rejectWithValue({ error: err.message })
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

    builder.addCase(fetchMyBookings.rejected, (state, { payload }) => {
      const updatedState = {
        ...state,
        loading: payload.loading,
        error: payload.error,
        myBookings: payload.myBookings,
      };
      return updatedState;
    });
  },
});

export const myBookingsActions = myBookingsSlice.actions;

export default myBookingsSlice.reducer;
