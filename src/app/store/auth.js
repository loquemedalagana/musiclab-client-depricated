import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";

const slice = createSlice({
  name: "auth",
  initialState: {
    userData: {
      username: "Jeon Inhyuk",
      description: "music sseolprise",
    },
    userSocialDataLoading: true,
    userSocialData: null,
    auth: false,
    loading: true,
    socketId: null,
  },
  reducers: {
    loadUser: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
      state.auth = true;
    },
    loadUserFail: (state) => {
      state.userData = null;
      state.loading = false;
      state.auth = false;
    },
    loginSuccess: (state) => {
      state.loading = true;
    },
    loginFail: (state) => {
      state.loading = false;
      state.auth = false;
    },
    logout: (state) => {
      state.auth = false;
      state.loading = true;
      state.userData = null;
      state.socketId = null;
    },
  },
});

export const {
  loadUser,
  loadUserSuccess,
  loadUserFail,
  loginSuccess,
  loginFail,
  logout,
} = slice.actions;

export const authSelector = (state) => state.auth;

export default slice.reducer;

//load user
export const fetchUser = () => async (dispatch) => {
  dispatch(loadUser());
  try {
    const response = await api.get(`/users/load`);
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    dispatch(loadUserFail());
  }
};

//login user
export const loginUser = (dataToSubmit) => async (dispatch) => {
  try {
    await api.post(`/users/login`, dataToSubmit);
    dispatch(loginSuccess());
    dispatch(fetchUser());
  } catch (error) {
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(loginFail());
  }
};

//logout user
export const logoutUser = () => async (dispatch) => {
  const response = await api.get(`/users/logout`);
  dispatch(setAlertMsg(response.data, "success"));
  dispatch(logout());
  dispatch(fetchUser());
};

//https://medium.com/dev-genius/async-api-fetching-with-redux-toolkit-2020-8623ff9da267
