import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import jobSlice from "../slices/jobSlice";
const rootReducer  = combineReducers({
    auth: authReducer,
    job:jobSlice
})

export default rootReducer