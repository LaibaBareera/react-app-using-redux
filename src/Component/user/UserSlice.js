import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const user_url= 'https://jsonplaceholder.typicode.com/users';
const initialState = {
  isAuthenticated: false,
  id: null,
  data: [],
};
  
  export const fetchUsers = createAsyncThunk('uses/fetchUsers',async() => {
    try{
      const response = await axios.get(user_url);
      return response.data
    }
    catch(error ){
      return error.message;
    }
  })

const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
      setUserId: (state, action) => {
        state.id = action.payload;
        state.isAuthenticated = true;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        // state.user = null;
      },
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.users= action.payload;
    
        })
    }
})
export const {extraReducers,setUserId , login, logout} = UserSlice.actions;
export const selectAuth = (state) => state.users.isAuthenticated;
export const selectAllUsers = (state)=>state.users.users;
export const selectUserId = (state) => state.users.id;

export default UserSlice.reducer;