import { configureStore, combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import user from './user';

const reducer = combineReducers({
  alert,
  user,
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;