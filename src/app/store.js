import { configureStore } from '@reduxjs/toolkit';

const initialState = {};

export default configureStore({
  reducer: {
    username: 'Jeon Inhyuk',
    description: 'singer and songwriter'
  },
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

//https://oyg0420.tistory.com/entry/ReactjsRedux-Toolkit%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-TodoList%EB%A7%8C%EB%93%A4%EA%B8%B0
