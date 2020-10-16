import {createSlice} from '@reduxjs/toolkit';
//import useSWR from 'swr';
//https://sergiodxa.com/articles/type-states-client-side-app

const slice = createSlice({
    name: 'profile',
    initialState: {
        loading: true,
        userList: [],
        targetUserData: null,
        likeTargetUser: false,
    },
    reducers: {
        fetchProfile: (state, {payload}) => {
            state.loading = false;
            state.targetUserData = payload.userData;
            state.likeTargetUser = payload.likeTargetUser;
        },
        fetchProfileFail: (state) => {
            state.loading = false;
            state.targetUserData = null;
        }
    },
});

export default slice.reducer;

export const {
    fetchProfile,
    fetchProfileFail,
} = slice.actions;

//get user profile (my or target)

//get user profile list

//update like to target user