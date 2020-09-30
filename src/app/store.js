import { configureStore } from '@reduxjs/toolkit';

const initialState = {};

export default configureStore({
  reducer: {
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  },
});
