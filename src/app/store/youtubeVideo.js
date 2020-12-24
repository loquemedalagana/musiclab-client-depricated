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
  },
});

export const { setInitState } = slice.actions;

export default slice.reducer;

//actions
