import {createSlice} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

//slice

//message, type, id
const slice = createSlice({
    name: 'alert',
    initialState: [],
    reducers: {
        setAlert: (state, action) => {
            state.push(action.payload);
        },
        removeAlert: (state, action) => {
            state.filter(alert => alert.id !== action.payload);
        }
    },
});

export default slice.reducer;

//actions
//how to set dispatch?
const {setAlert, removeAlert} = slice.actions;

export const setAlertMsg = (message, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch(setAlert({message, alertType, id}));

    setTimeout(() => dispatch(removeAlert({id})), timeout);
}