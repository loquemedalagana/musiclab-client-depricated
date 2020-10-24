import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { setAlertMsg } from './alert';
import { fetchUser } from './auth';

//expired 여부 기록하기
const slice = createSlice({
    name: 'userValidation',
    initialState: {
        changed: false,
        token: null,
        expired: true,
    },
    reducers: {
        signupSuccess: (state) => {
            state.changed = true;
        },
        signupFail: (state) => {
            state.changed = false;
        },
        sendAuthCodeSuccess: (state) => {
            state.changed = true;
        },
        sendAuthCodeFail: (state) => {
            state.changed = false;
        },
        levelupSucess: (state) => {
            state.changed = true;
        },
        levelupFail: (state) => {
            state.changed = false;
        }
    },
});

export const {
    signupSuccess,
    signupFail,
    sendAuthCodeSuccess,
    sendAuthCodeFail,
    levelupSucess,
    levelupFail
} = slice.actions;

export default slice.reducer;

// 임시용 /users/register/emailauth?email=${email}
export const sendEmailAuthCode = dataToSubmit => async dispatch => {
    try {
        const {email} = dataToSubmit;
        const response = await api.get(`/users/register/${email}`);
        console.log(response.data); //success message
        sendAuthCodeSuccess();
        setAlertMsg(response.data.message, 'success');

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }
        sendAuthCodeFail();
    }
}

export const signupUser = dataToSubmit => async dispatch => {
    try {
        const response = await api.post(`/users/register`, dataToSubmit);
        dispatch(signupSuccess());
        setAlertMsg(response.data.message, 'success');
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
        const response = await api.patch(`/users/register/email`, dataToSubmit);
        dispatch(signupSuccess());
        setAlertMsg(response.data.message, 'success');
        dispatch(fetchUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }
        dispatch(signupFail());
    }
}