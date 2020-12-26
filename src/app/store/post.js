import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { setAlertMsg } from "./alert";

const slice = createSlice({
  name: "post",
  initialState: {
    changed: false,
  },
  reducers: {
    setInitState: (state) => {
      state.changed = false;
    },
  },
});

export const { setInitState } = slice.actions;

export default slice.reducer;
