import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USERS } from '../api/api';

// Set up axios instance for authentication requests
// We must use `withCredentials: true` for the browser to attach the httpOnly 'jwt' cookie
const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const initialState = {
  user: null, // Stores user data (name, email, etc.)
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- AUTH THUNKS ---

// Thunk for User Signup
export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await authAxios.post(`${BASE_URL}${USERS}/signup`, userData);
    // On success, the cookie is set, and we return the user data
    return response.data.data.user;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data.message || 'Signup failed');
  }
});

// Thunk for User Login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAxios.post(`${BASE_URL}${USERS}/login`, credentials);
    // On success, the cookie is set, and we return the user data
    return response.data.data.user;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data.message || 'Login failed');
  }
});

// Thunk for User Logout
// This sends a request to the backend to clear the cookie
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Assuming you've added a logout route: POST /api/v1/users/logout
    await authAxios.get(`${BASE_URL}${USERS}/logout`);
    // Successful logout needs no return data, just state change
    return;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // A potential reducer to check if user is already logged in (e.g., on first load)
    // For this basic setup, we rely on the API call to succeed or fail.
  },
  extraReducers: builder => {
    builder
      // --- SIGNUP & LOGIN (Shared success logic) ---
      .addCase(signupUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Signup failed';
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
      })
      // --- LOGOUT ---
      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        // Even if the logout request fails, we assume the user is logged out for frontend state management
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Logout failed, but proceeding to logged out state.';
      });
  },
});

export default authSlice.reducer;
