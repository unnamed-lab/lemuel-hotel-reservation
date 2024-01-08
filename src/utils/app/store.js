import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../auth/authSlice";
import companyReducer from '../company/companySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer 
    }
})