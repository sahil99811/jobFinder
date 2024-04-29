import {createSlice} from '@reduxjs/toolkit';

const initialState={
    jobs:[]
}
const jobSlice=createSlice({
    name:"job",
    initialState:initialState,
    reducers:{
        setJobs(state,value){
            state.jobs=value.payload;
        }
    }
})
export const { setJobs} = jobSlice.actions;
  
  export default jobSlice.reducer;