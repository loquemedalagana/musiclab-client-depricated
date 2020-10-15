import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import {setAlertMsg} from './alert';


//https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

const slice = createSlice({
    name: 'auth',
    initialState: {
        userData: {
            username: 'Jeon Inhyuk',
            description: 'music sseolprise',
        },
        auth: false,
        loading: true,
        socketId: null,
    },
    reducers: {
        loadUser: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, {payload}) => {
            console.log(payload);
            state.loading = false; 
            state.userData = payload;
            state.auth = true;
        },
        loadUserFail: (state) => {
            state.userData = null;
            state.loading = false;
            state.auth = false;
        },
        login: (state, {payload}) => {
            state.userData = payload;
            state.loading = false;
            state.auth = true;
        },
        loginFail: (state) => {
            state.loading = false;
            state.auth = false;
        },
        logout: (state) => {
            state.loading = false;
            state.userData = null;
            state.socketId = null;
        }
    },
});

export const {
    loadUser,
    loadUserSuccess,
    loadUserFail,
    login,
    loginFail,
    logout,
} = slice.actions;

export const authSelector = state => state.auth;

export default slice.reducer;

//load user
export const fetchUser = () => async dispatch => {
    dispatch(loadUser());
    try {
        const response = await api.get(`/users/auth`);
        dispatch(response.data);
    } catch (err) {
        dispatch(loadUserFail());
    }
}

//login user
export const loginUser = dataToSubmit => async dispatch => {
    try {
        const response = await api.post(`/users/login`, dataToSubmit);
        dispatch(login(response.data));
        dispatch(fetchUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => (dispatch(setAlertMsg(error.message.message, 'error'))));
        }
        dispatch(loginFail());
    }
}

//logout user
export const logoutUser = () => async dispatch => {
    const response = await api.get(`/users/logout`);
    dispatch(setAlertMsg(response.data.message, 'success'));
    dispatch(logout());
    dispatch(fetchUser()); 
}

//update profile and tags

//https://post.naver.com/viewer/postView.nhn?volumeNo=29438367&memberNo=10070839