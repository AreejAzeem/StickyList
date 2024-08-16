import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/utils/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
