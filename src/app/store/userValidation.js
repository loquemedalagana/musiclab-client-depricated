import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import {setAlertMsg} from './alert';
import { fetchUser } from './auth';

const slice = createSlice({
    name: 'userValidation',
    initialState: {
        changed: false,

    },
    reducers: {
        signupSuccess: (state) => {
            state.changed = true;
        },
        signupFail: (state) => {
            state.changed = true;
        },
        sendAuthCodeSuccess: (state) => {
            state.changed = true;
        },
        sendAuthCodeFail: (state) => {
            state.changed = true;
        },
        levelupSucess: (state) => {
            state.changed = true;
        },
        levelupFail: (state) => {
            state.changed = true;
        }
    },
});

export const {
    signupSuccess,
    signupFail,

} = slice.actions;

export default slice.reducer;

export const sendEmailAuthCode = dataToSubmit => async dispatch => {
    try {
        const {_id, email} = dataToSubmit;
        const response = await api.get(`/users/register/emailauth?userid=${_id}&email=${email}`);
        console.log(response.data); //success message
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }

    }
}

export const signupUser = dataToSubmit => async dispatch => {
    try {
        await api.post(`/users/register`, dataToSubmit);
        dispatch(signupSuccess());
        dispatch(fetchUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }
        dispatch(signupFail());
    }
}

export const emailRegister = dataToSubmit => async dispatch => {
    try {
        await api.post(`/users/register`, dataToSubmit);
        dispatch(signupSuccess());
        dispatch(fetchUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }
        dispatch(signupFail());
    }
}