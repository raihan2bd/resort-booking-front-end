import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
    const response = await axios.get('/reservations', { withCredentials: true });
    return response.data;
});