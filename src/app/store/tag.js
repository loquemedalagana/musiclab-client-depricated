import { createSlice } from "@reduxjs/toolkit";
//import api from '../api';

//slice

//message, type, id
const slice = createSlice({
  name: "alert",
  initialState: {
    loading: true,
    tags: ["vocal", "guitar", "composition"],
  },
  reducers: {},
});

export default slice.reducer;
