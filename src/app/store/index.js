import { configureStore, combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import userValidation from './userValidation';

const reducer = combineReducers({
  alert,
  auth,
  userValidation,
  profile,
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;