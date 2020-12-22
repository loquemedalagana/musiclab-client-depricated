import { configureStore, combineReducers } from "@reduxjs/toolkit";
import alert from "./alert";
import auth from "./auth";
import tag from "./tag";
import userControl from "./userControl";
import video from "./video";

//회원가입, 레벨업은 상의 후에

const reducer = combineReducers({
  alert,
  auth,
  tag,
  userControl,
  video,
});

//https://velog.io/@ohgoodkim/-%EC%97%90%EB%9F%AC%EB%85%B8%ED%8A%B8-Cant-perform-a-React-state-update-on-an-unmounted-component
//https://www.debuggr.io/react-update-unmounted-component/
//https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm

const store = configureStore({
  reducer,
  //  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
