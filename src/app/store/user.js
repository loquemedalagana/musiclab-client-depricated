import {createSlice} from '@reduxjs/toolkit';

//initial user (token)
//login, logout, update,
//email auth
//https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

const slice = createSlice({
    name: 'user',
    initialState: {
        data: {
            username: 'Jeon Inhyuk',
        },
        loading: true,
    },
    reducers: {

    },
});

export default slice.reducer;