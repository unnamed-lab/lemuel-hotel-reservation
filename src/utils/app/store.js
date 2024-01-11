import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../auth/authSlice";
import companyReducer from '../company/companySlice';
import hotelReducer from '../hotel/hotelSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
        hotel: hotelReducer
    }
})