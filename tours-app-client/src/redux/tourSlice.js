import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, TOURS } from '../api/api';

// Create a configured axios instance to handle cookies
// This is CRITICAL for the browser to send the 'jwt' cookie with protected requests.
const protectedAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Initial state for the tour slice
const initialState = {
  tours: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1,
  limit: 4, // Show 4 tours on load, as requested
  totalTours: 9, // Total tours available in the back-end (for client-side pagination)
  filters: {}, // { price: { gte: 300 }, duration: { lte: 5 } }
};

// Async Thunk for fetching tours from the API
export const fetchTours = createAsyncThunk('tours/fetchTours', async (params, { getState, rejectWithValue }) => {
  const { currentPage, limit, filters } = getState().tours;

  // Build the query string from state
  const queryParams = new URLSearchParams();
  queryParams.append('page', params?.page || currentPage);
  queryParams.append('limit', params?.limit || limit);

  // Add filters to query
  for (const [key, value] of Object.entries(filters)) {
    for (const [op, val] of Object.entries(value)) {
      queryParams.append(`${key}[${op}]`, val);
    }
  }

  const url = `${BASE_URL}${TOURS}?${queryParams.toString()}`;

  try {
    // Use the protectedAxios instance
    const response = await protectedAxios.get(url);

    // Assuming the API returns a 'data' object with 'data' array and maybe 'total' for count
    return response.data.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // If 401, it means the user is unauthorized/not logged in.
      return rejectWithValue('Unauthorized: Please log in to view tours.');
    }
    return rejectWithValue(err.message);
  }
});

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    // Reducer for changing the current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Reducer for applying filters
    setFilters: (state, action) => {
      // action.payload is the new filter object, e.g., { price: { gte: 500 } }
      state.filters = action.payload;
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: state => {
      state.filters = {};
      state.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTours.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
        state.error = null; // Clear any previous auth errors
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCurrentPage, setFilters, clearFilters } = tourSlice.actions;

export default tourSlice.reducer;
