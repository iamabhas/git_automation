import {createSlice} from "@reduxjs/toolkit";

export interface CounterState{
    githubAccessToken:string | null,
}

const initialState:CounterState={
    githubAccessToken:null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            state.githubAccessToken = action.payload
        },
        logoutUser:(state)=>{
            state.githubAccessToken=null
        }
    }

})

export const { loginUser,logoutUser } = authSlice.actions

export default authSlice.reducer
