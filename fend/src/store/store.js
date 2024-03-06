import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/counterslice.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});