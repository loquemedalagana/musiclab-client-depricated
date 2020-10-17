import { configureStore, combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import auth from './auth';
import tag from './tag';

//회원가입, 레벨업은 상의 후에

const reducer = combineReducers({
  alert,
  auth,
  tag,
})

const store = configureStore({
  reducer,
//  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;