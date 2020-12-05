import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

//slice

//message, type, id
const slice = createSlice({
  name: "alert",
  initialState: [],
  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      const removeIdx = state
        .map((element) => element.id)
        .indexOf(action.payload.id);
      state.splice(removeIdx, 1);
    },
  },
});

export default slice.reducer;

//actions
//how to set dispatch?
const { setAlert, removeAlert } = slice.actions;

export const setAlertMsg = (message, alertType, name, timeout = 5000) => (
  dispatch
) => {
  const id = uuidv4();
  dispatch(setAlert({ message, alertType, name, id }));

  setTimeout(() => dispatch(removeAlert({ id })), timeout);
};
