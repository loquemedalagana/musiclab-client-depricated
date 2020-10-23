import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import {setAlertMsg} from './alert';
import { fetchUser } from './auth';

const slice = createSlice({
    name: 'userValidation',
    initialState: {
        loading: true,

    },
    reducers: {
        signupSuccess: (state) => {
            state.loading = true;
        },
        signupFail: (state) => {
            state.loading = true;
        },
        
    },
});

export const {
    signupSuccess,
    signupFail,

} = slice.actions;

export default slice.reducer;

//
export const signupUser = dataToSubmit => async dispatch => {
    try {
        await api.post(`/users/register`, dataToSubmit);
        dispatch(signupSuccess());
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
        
    } catch (err) {
        
    }
}
