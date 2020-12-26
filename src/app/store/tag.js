import { createSlice } from "@reduxjs/toolkit";
//import api from '../api/api';

// 내 태그 불러오기

const slice = createSlice({
  name: "alert",
  initialState: {
    changed: false,
    loading: true,
    tags: ["vocal", "guitar", "composition"],
  },
  reducers: {},
});

export default slice.reducer;

// 내 태그 추가하기
