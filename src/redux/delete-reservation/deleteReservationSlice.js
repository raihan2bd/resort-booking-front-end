import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
    const response = await axios.get('/reservations', { withCredentials: true });
    return response.data;
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (bookingId) => {
    const response = await axios.delete(`/reservations/${bookingId}`, { withCredentials: true });
    return response.data;
});