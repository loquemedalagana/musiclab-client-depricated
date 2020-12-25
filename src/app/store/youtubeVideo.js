import { createSlice } from "@reduxjs/toolkit";
import InhyukSampleVideoList from "../data/yada/InhyukSampleVideoList";
//import api from "../api";
//import { setAlertMsg } from "./alert";

// 0. 내 영상 불러오기 (App.js에도 추가하기)

// 1. 회원 영상

// 2. 공식 채널 영상

// 3. 베스트 영상 (사슬)

// 4. 베스트 영상 (커버)

const slice = createSlice({
  name: "youtubeVideo",
  initialState: {
    changed: false,
    myYoutubeVideoList: InhyukSampleVideoList,
  },
  reducers: {
    addYoutubeVideoSuccess: (state, { payload }) => {
      console.log(state, payload);
    },
    addYoutubeVideoFail: (state, { payload }) => {
      console.log(state, payload);
    },
  },
});

export const { addYoutubeVideoSuccess, addYoutubeVideoFail } = slice.actions;

export default slice.reducer;

//actions
// 1. 영상 등록하기 (유튜브 영상)
