import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";
import { loginUser } from "./auth";

//expired 여부 기록하기
const slice = createSlice({
  name: "userControl",
  initialState: {
    changed: false,
  },
  reducers: {
    signupSuccess: (state) => {
      state.changed = true;
    },
    signupFail: (state) => {
      state.changed = false;
    },
    sendAuthCodeSuccess: (state) => {
      state.changed = true;
    },
    sendAuthCodeFail: (state) => {
      state.changed = false;
    },
    changedUserInfoSucess: (state) => {
      window.location.reload();
      state.changed = true;
    },
    changedUserInfoFail: (state) => {
      state.changed = false;
    },
    setInitState: (state) => {
      state.changed = false;
    },
  },
});

export const {
  setInitState,
  signupSuccess,
  signupFail,
  sendAuthCodeSuccess,
  sendAuthCodeFail,
  changedUserInfoSucess,
  changedUserInfoFail,
} = slice.actions;

export default slice.reducer;

// actions
export const sendEmailAuthCode = (dataToSubmit) => async (dispatch) => {
  try {
    const { email } = dataToSubmit;
    const response = await api.get(`/users/register/${email}`);
    dispatch(sendAuthCodeSuccess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(sendAuthCodeFail());
    dispatch(setInitState());
  }
};

export const signupUser = (dataToSubmit) => async (dispatch) => {
  try {
    const { email, password } = dataToSubmit;
    const response = await api.post(`/users/register`, dataToSubmit);
    dispatch(signupSuccess());
    dispatch(
      loginUser({
        email,
        password,
      })
    );
    console.log(response.data);
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(signupFail());
    dispatch(setInitState());
  }
};

export const emailRegister = (dataToSubmit) => async (dispatch) => {
  try {
    const response = await api.post(`/users/register/email`, dataToSubmit);
    dispatch(signupSuccess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(signupFail());
    dispatch(setInitState());
  }
};

//find password
export const requestFindPassword = (dataToSubmit) => async (dispatch) => {
  try {
    const response = await api.post(`/users/findinfo/password`, dataToSubmit);
    console.log(response.data);
    dispatch(setAlertMsg(response.data, "success"));
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlertMsg(error.response.data, "error"));
  }
};

//reset password
export const resetPassword = (dataToSubmit, urlQuery) => async (dispatch) => {
  const { token, expiredtime } = urlQuery;
  //console.log(dataToSubmit, urlQuery);
  try {
    const response = await api.patch(
      `/users/findinfo/resetpassword/?token=${token}&expiredtime=${expiredtime}`,
      dataToSubmit
    );
    //state change
    dispatch(changedUserInfoSucess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(changedUserInfoFail());
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(setInitState());
  }
};

//levelup
export const requestLevelup = (dataToSubmit, urlQuery) => async (dispatch) => {
  const { token, expiredtime } = urlQuery;
  try {
    const response = await api.post(
      `/users/register/levelup/?token=${token}&expiredtime=${expiredtime}`,
      dataToSubmit
    );
    dispatch(changedUserInfoSucess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(changedUserInfoFail());
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(setInitState());
  }
};

//update info
export const updateUserProfile = (dataToSubmit) => async (dispatch) => {
  //patch
  const ENDPOINT = `/users/update/profile`;
  try {
    const response = await api.patch(ENDPOINT, dataToSubmit);
    dispatch(changedUserInfoSucess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(changedUserInfoFail());
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(setInitState());
  }
};

// update user socialinfo
export const updateUserSocial = (socialData) => async (dispatch) => {
  //patch
  const ENDPOINT = `/users/update/social`;
  try {
    const response = await api.patch(ENDPOINT, socialData);
    dispatch(changedUserInfoSucess());
    dispatch(setAlertMsg(response.data, "success"));
    dispatch(setInitState());
  } catch (error) {
    dispatch(changedUserInfoFail());
    console.log(error);
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(setInitState());
  }
};
