import { createSlice } from "@reduxjs/toolkit";
//import api from '../api';

//slice

//message, type, id
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

// fetch a user's tag

// add my tag
// 태그 검색 후 존재하지 않으면 태그에 추가하고 유저랑 연관시킴
// 있으면 바로 연관시킴
