import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
//import {setAlertMsg} from './alert';


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
            state.loading = false;
            state.auth = false;
        }
    },
});

export const {
    loadUser,
    loadUserSuccess,
    loadUserFail,

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

//logout user

//update profile

//https://post.naver.com/viewer/postView.nhn?volumeNo=29438367&memberNo=10070839