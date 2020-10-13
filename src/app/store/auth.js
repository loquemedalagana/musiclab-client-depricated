import {createSlice} from '@reduxjs/toolkit';

//initial user (token)
//login, logout, update,
//email auth
//https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

const slice = createSlice({
    name: 'auth',
    initialState: {
        userData: {
            username: 'Jeon Inhyuk',
            description: 'music sseolprise',
        },
        loading: true,
    },
    reducers: {

    },
});

export default slice.reducer;

//load user

//login user

//logout user

//signup user

//email auth

//levelup user

//update my profile