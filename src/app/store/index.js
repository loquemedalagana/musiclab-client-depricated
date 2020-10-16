import { configureStore, combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import auth from './auth';

const reducer = combineReducers({
  alert,
  auth,
})

const store = configureStore({
  reducer,
//  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;