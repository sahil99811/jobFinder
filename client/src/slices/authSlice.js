import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    jobPoster:false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setToken(state, value) {
        state.token = value.payload;
      },
      setJobPoster(state,value){
        state.token=value.payload
      }
    },
  });
  
  export const { setToken,setJobPoster } = authSlice.actions;
  
  export default authSlice.reducer;