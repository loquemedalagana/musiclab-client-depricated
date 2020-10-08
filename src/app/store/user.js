import {createSlice} from '@reduxjs/toolkit';

//initial user (token)
//login, logout, update,
//email auth

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