// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.js';

// const store = createStore(counterReducer);

const store = configureStore({
  reducer: counterReducer,
});

export default store;
