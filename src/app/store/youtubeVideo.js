import { createSlice } from "@reduxjs/toolkit";
import InhyukSampleVideoList from "../data/yada/InhyukSampleVideoList";
//import api from "../api";
//import { setAlertMsg } from "./alert";

//expired 여부 기록하기
const slice = createSlice({
  name: "youtubeVideo",
  initialState: {
    changed: false,
    myVideoList: InhyukSampleVideoList,
  },
  reducers: {
    setInitState: (state) => {
      state.changed = false;
    },
    // load video
  },
});

export const { setInitState } = slice.actions;

export default slice.reducer;

//actions
// 0. 내 영상 불러오기

// 1. 회원 영상

// 2. 공식 채널 영상

// 3. 베스트 영상 (사슬)

// 4. 베스트 영상 (커버)

// 5. 영상 등록하기 (유튜브 영상)
