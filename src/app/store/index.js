import { configureStore } from '@reduxjs/toolkit';
import alert from './alert';
import user from './user';

const store = configureStore({
  reducer: {
    alert,
    user,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;