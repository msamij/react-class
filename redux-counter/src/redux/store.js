import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import counterReducer from './counterSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
  },
});

export default store;
