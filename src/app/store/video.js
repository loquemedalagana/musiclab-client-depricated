import { createSlice } from "@reduxjs/toolkit";
import { SampleVideoList } from "../videoData/SampleData/SampleVideoData";
//import api from "../api";
//import { setAlertMsg } from "./alert";

//expired 여부 기록하기
const slice = createSlice({
  name: "video",
  initialState: {
    changed: false,
    myVideoList: SampleVideoList,
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
