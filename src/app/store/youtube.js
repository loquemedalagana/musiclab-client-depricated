import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";

// 0. 내 영상 불러오기 (App.js에도 추가하기)

// 1. 채널 프로필 불러오기
export const fetchChannelProfile = createAsyncThunk(
  "youtubevideo/fetchChannelProfile",
  async (channelId) => {
    // 채널 프로필 불러오기
  }
);

// 2. 채널 영상 불러오기 (조건에 따라)

const slice = createSlice({
  name: "youtube",
  initialState: {
    changed: false,
    channelProfile: null,
    videoList: [],
  },
  reducers: {
    addYoutubeVideoSuccess: (state, { payload }) => {
      // 등록된 데이터 페이지로 넘어가서 player 재생
      console.log(state, payload);
    },
    addYoutubeVideoFail: (state) => {
      console.log(state);
    },
  },
});

export const { addYoutubeVideoSuccess, addYoutubeVideoFail } = slice.actions;

export default slice.reducer;

//actions
// 1. 영상 등록하기 (유튜브 영상) - 영상 id 기준
export const addYoutubeVideoByVideoId = (dataToSubmit) => async (dispatch) => {
  try {
    const response = await api.post(`/youtubevideos/add`, dataToSubmit);
    dispatch(setAlertMsg(response.data.message), "success"); // 새 영상, 성공 메시지 데이터로 받아오기.
    dispatch(addYoutubeVideoSuccess());
  } catch (error) {
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(addYoutubeVideoFail());
  }
};

// 2. 영상 등록하기 (유튜브 영상) - 재생목록 id 기준
