import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
//import {setAlertMsg} from './alert';


//https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            username: 'Jeon Inhyuk',
            description: 'music sseolprise',
        },
        loading: true,
        socketId: null,
    },
    reducers: {

    },
});

export default slice.reducer;

//load user
const loadUser = createAsyncThunk(
    `auth/loadUser`,
    
);

//login user

//logout user

//update profile