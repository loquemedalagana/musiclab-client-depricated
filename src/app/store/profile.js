import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InhyukSampleVideoList from "../data/yada/InhyukSampleVideoList";
import api from "../api/api";

export const fetchTargetUserData = createAsyncThunk(
  "profile/fetchTargetUserData",
  async (targetUserId) => {
    const ENDPOINT = `/profiles/${targetUserId}`;
    const response = await api.get(ENDPOINT);
    return response.data;
  }
);

const slice = createSlice({
  name: "profile",
  initialState: {
    targetUserNotFound: false,
    targetUserDataLoading: true,
    targetUserData: null,
    targetUserPostListLoading: true,
    targetUserPostList: [],
    targetUserYoutubeVideoListLoading: true,
    targetUserYoutubeVideoList: InhyukSampleVideoList,
    targetUserTagListLoading: true,
    targetUserTagList: [],
  },
  extraReducers: {
    [fetchTargetUserData.pending]: (state) => {
      state.targetUserDataLoading = true;
    },
    [fetchTargetUserData.fulfilled]: (state, { payload }) => {
      state.targetUserDataLoading = false;
      state.targetUserData = payload;
      state.targetUserNotFound = false;
    },
    [fetchTargetUserData.rejected]: (state) => {
      state.targetUserDataLoading = false;
      state.targetUserNotFound = true;
      state.targetUserPostList = null;
    },
  },
});

export default slice.reducer;
