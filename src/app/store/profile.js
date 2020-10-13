import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'profile',
    initialState: {
        loading: true,
        userList: [],
        targetUserData: null,
        likeTargetUser: false,
    },
    reducers: {
        
    },
});

export default slice.reducer;

//get user profile (my or target)

//get user profile list

//update like to target user