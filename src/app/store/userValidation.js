import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { setAlertMsg } from './alert';
import { loginUser } from './auth';

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
        changedUserInfoSucess: (state) => {
            state.changed = true;
        },
        changedUserInfoFail: (state) => {
            state.changed = false;
        },
        setInitState: state => {
            state.changed = false;
        }
    },
});

export const {
    setInitState,
    signupSuccess,
    signupFail,
    sendAuthCodeSuccess,
    sendAuthCodeFail,
    changedUserInfoSucess,
    changedUserInfoFail
} = slice.actions;

export default slice.reducer;

// actions
export const sendEmailAuthCode = dataToSubmit => async dispatch => {
    try {
        const {email} = dataToSubmit;
        const response = await api.get(`/users/register/${email}`);
        dispatch(sendAuthCodeSuccess());
        dispatch(setAlertMsg(response.data.message, 'success'));
        dispatch(setInitState());
    } catch (err) {
        dispatch(setAlertMsg(err.response.data.message, 'error'))
        dispatch(sendAuthCodeFail());
        dispatch(setInitState());
    }
}

export const signupUser = dataToSubmit => async dispatch => {
    try {
        const {email, password} = dataToSubmit;
        const response = await api.post(`/users/register`, dataToSubmit);
        dispatch(signupSuccess());
        dispatch(loginUser({
            email,
            password
        }));
        dispatch(setAlertMsg(response.data.message, 'success'));
        dispatch(setInitState());
    } catch (err) {
        dispatch(setAlertMsg(err.response.data.message, 'error'))
        dispatch(signupFail());
        dispatch(setInitState());
    }
}

export const emailRegister = dataToSubmit => async dispatch => {
    try {
        const {email} = dataToSubmit;
        const response = await api.patch(`/users/register/email`, dataToSubmit);
        dispatch(signupSuccess());
        if(response.data.success) dispatch(sendEmailAuthCode({email}));
        else throw Error('failed response!');
    } catch (err) {
        dispatch(setAlertMsg(err.response.data.message, 'error'))
        dispatch(signupFail());
        dispatch(setInitState());
    }
}

//find password
export const requestFindPassword = dataToSubmit => async dispatch => {
    try {
        const response = await api.post(`/users/findinfo/password`, dataToSubmit);
        dispatch(setAlertMsg(response.data.message, 'success'));
    } catch (err) {
        //console.log(err.response.data);
        dispatch(setAlertMsg(err.response.data.message, 'error'))
    }
}

//reset password

//levelup

//update info