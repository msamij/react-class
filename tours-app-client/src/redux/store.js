import { configureStore } from '@reduxjs/toolkit';
import tourReducer from './tourSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    tours: tourReducer,
    auth: authReducer,
  },
});
