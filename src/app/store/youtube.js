import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";

const officialChannelIdList = {
  jihbandofficial: "UChNtl7wRLF6x4B4fp7KCyhQ",
};

// 1. 채널 프로필 불러오기
export const fetchChannelProfile = createAsyncThunk(
  "youtube/fetchChannelProfile",
  async (channelInfo) => {
    const { category, channelparams } = channelInfo;
    const channelId =
      category === "official"
        ? officialChannelIdList[channelparams]
        : channelparams;
    const ENDPOINT = `/youtube/channels/${channelId}?category=${category}`;
    const response = await api.get(ENDPOINT);
    return response.data;
  }
);

// 2. 채널 영상 불러오기 (조건에 따라)

const slice = createSlice({
  name: "youtube",
  initialState: {
    channelProfileLoading: true,
    channelProfile: null,
    videoListLoading: true,
    videoList: [],
    message: null,
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
  extraReducers: {
    [fetchChannelProfile.pending]: (state) => {
      state.channelProfileLoading = true;
    },
    [fetchChannelProfile.fulfilled]: (state, { payload }) => {
      state.channelProfileLoading = false;
      state.channelProfile = payload;
    },
    [fetchChannelProfile.rejected]: (state, { payload }) => {
      console.log(payload);
      state.channelProfileLoading = false;
      state.channelProfile = null;
    },
  },
});

export const { addYoutubeVideoSuccess, addYoutubeVideoFail } = slice.actions;

export default slice.reducer;

//actions
// 1. 영상 등록하기 (유튜브 영상) - 영상 id 기준
export const addYoutubeVideoByVideoId = (dataToSubmit) => async (dispatch) => {
  try {
    const response = await api.post(`/youtube/videos/add`, dataToSubmit);
    dispatch(setAlertMsg(response.data.message), "success"); // 새 영상, 성공 메시지 데이터로 받아오기.
    dispatch(addYoutubeVideoSuccess());
  } catch (error) {
    dispatch(setAlertMsg(error.response.data, "error"));
    dispatch(addYoutubeVideoFail());
  }
};

// 2. 영상 등록하기 (유튜브 영상) - 재생목록 id 기준
