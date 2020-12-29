import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InhyukSampleVideoList from "../data/yada/InhyukSampleVideoList";
import api from "../api/api";
import { setAlertMsg } from "./alert";

// fetch my video list
export const fetchMyVideoList = createAsyncThunk(
  "user/fetchMyVideoList",
  async (curUserInfo) => {
    const { id } = curUserInfo;
    const ENDPOINT = `/youtube/uservideolist/${id}`;
    const response = await api.get(ENDPOINT);
    return response.data;
  }
);

const slice = createSlice({
  name: "user",
  initialState: {
    userData: {
      username: "Jeon Inhyuk",
      description: "music sseolprise",
    },
    auth: false,
    loading: true,

    loadVideoListLoading: true,
    loadVideoListDone: false,
    loadVideoListError: null,
    hasMoreList: true,
    youtubeVideoList: InhyukSampleVideoList.slice(6),
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
  extraReducers: {
    [fetchMyVideoList.pending]: (state) => {
      state.loadVideoListLoading = true;
    },
    [fetchMyVideoList.fulfilled]: (state, { payload }) => {
      state.loadVideoListLoading = false;
      state.loadVideoListDone = true;
      state.youtubeVideoList = [...payload];
    },
    [fetchMyVideoList.rejected]: (state, { error }) => {
      state.loadVideoListLoading = false;
      state.loadVideoListDone = false;
      state.loadVideoListError = error.message;
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
