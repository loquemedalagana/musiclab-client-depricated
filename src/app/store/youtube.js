import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";

const officialChannelIdList = {
  jihbandofficial: "UChNtl7wRLF6x4B4fp7KCyhQ",
};

const officialChannelProfileImage = {
  jihbandofficial:
    "https://yt3.ggpht.com/ytc/AAUvwniV3e0j1NQbR2l1RW5C01DNjglP_gjnHuPz8JHM=s800-c-k-c0x00ffffff-no-rj",
};

// 1. 채널 프로필 불러오기
export const fetchChannelProfile = createAsyncThunk(
  "youtube/fetchChannelProfile",
  async (channelInfo) => {
    const { category, channelparams } = channelInfo;
    const channelId =
      category === "official" || channelparams === "jihbandofficial"
        ? officialChannelIdList[channelparams]
        : channelparams;
    const ENDPOINT = `/youtube/channels/${channelId}?category=${category}`;
    const response = await api.get(ENDPOINT);
    return response.data;
  }
);

// 2. 채널 영상 불러오기 (조건에 따라)
export const fetchChannelVideoList = createAsyncThunk(
  "youtube/fetchChannelVideoList",
  async (channelInfo) => {
    const { channelId } = channelInfo;
    const ENDPOINT = `/youtube/channels/${channelId}/list`;
    const response = await api.get(ENDPOINT);
    return response.data;
  }
);

// 3. 개별 영상 가져오기
export const fetchYoutubeVideoData = createAsyncThunk(
  "youtube/fetchYoutubeVideoData",
  async ({ videoId }) => {
    const ENDPOINT = `/youtube/videos/${videoId}`;
    const response = await api.get(ENDPOINT);
    const isOfficial =
      response.data.channelId === officialChannelIdList["jihbandofficial"];
    return isOfficial
      ? {
          ...response.data,
          profileImage: officialChannelProfileImage["jihbandofficial"],
        }
      : response.data;
  }
);

// 4. 영상 등록하기 (id 기준)

// 5. 영상 등록하기 (재생목록 id 기준)

const slice = createSlice({
  name: "youtube",
  initialState: {
    channelProfileLoading: true,
    channelProfile: null,
    loadVideoListLoading: false,
    loadVideoListDone: false,
    loadVideoListError: null,
    hasMoreList: true,
    videoList: [],

    addYoutubeVideoLoading: true,
    addYoutubeVideoDone: false,
    addYoutubeVideoError: null,

    loadYoutubeVideoDataLoading: true,
    loadYoutubeVideoDataDone: false,
    loadYoutubeVideoDataError: null,
    youtubeVideoData: null,

    loadYoutubeVideoCommentsLoading: true,
    loadYoutubeVideoCommentsDone: false,
    youtubeVideoComments: [],
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
    [fetchChannelVideoList.pending]: (state) => {
      state.loadVideoListLoading = true;
    },
    [fetchChannelVideoList.fulfilled]: (state, { payload }) => {
      state.loadVideoListLoading = false;
      state.loadVideoListDone = true;
      state.videoList = [...payload]; // 무한 스크롤에서 바꾸기
    },
    [fetchChannelVideoList.rejected]: (state, { payload }) => {
      state.loadVideoListLoading = false;
      state.loadVideoListDone = false;
      state.loadVideoListError = payload;
    },
    [fetchYoutubeVideoData.pending]: (state) => {
      state.loadYoutubeVideoDataLoading = true;
    },
    [fetchYoutubeVideoData.fulfilled]: (state, { payload }) => {
      state.loadYoutubeVideoDataLoading = false;
      state.loadYoutubeVideoDataDone = true;
      state.youtubeVideoData = payload;
    },
    [fetchYoutubeVideoData.rejected]: (state, { payload }) => {
      state.loadYoutubeVideoDataLoading = false;
      state.loadYoutubeVideoDataDone = false;
      state.loadYoutubeVideoDataError = payload;
    },
  },
});

export const { addYoutubeVideoSuccess, addYoutubeVideoFail } = slice.actions;

export default slice.reducer;
