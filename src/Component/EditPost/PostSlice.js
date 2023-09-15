// postSlice.js
import { createSlice, nanoid,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {sub} from 'date-fns'
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const initialState = {
  posts:[],
  status:'idle',
  error:null 
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async() => {
  try{
    const response = await axios.get(postURL);
    return [...response.data];
  }
  catch(error ){
    return error.message;
  }
})
export const addNewPosts = createAsyncThunk('posts/addNewPost',async(initialPost) => {
  try{
    const response = await axios.post(postURL,initialPost);
    return response.data;
  }
  catch(error ){
    return error.message;
  }
})
export const editPosts = createAsyncThunk('posts/editPost',async(updatedPost) => {
  try{
    const { id, ...restOfUpdatedPost } = updatedPost;
    const response = await axios.put(`${postURL}/${id}`,restOfUpdatedPost);
    return response.data
  }
  catch(error ){
    return error.message;
  }
})
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  try {
    await axios.delete(`${postURL}/${postId}`);
    return postId;
  } catch (error) {
    return error.message;
  }
});
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers(builder){
      builder
      .addCase(fetchPosts.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled,(state,action)=>{
        // debugger
        state.status = 'succeeded';
        state.posts = action.payload; 
      
      })
      .addCase(fetchPosts.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled,(state,action)=>{
        action.payload.userId = Number(action.payload.userId);
        state.posts.push(action.payload);
      })
      .addCase(editPosts.fulfilled,(state,action)=>{
        const updatedPost = action.payload;

        const postIndex = state.posts.findIndex((post)=>post.id === updatedPost.id);
        if (postIndex !== -1) {
          // Update the post in the state
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deletedPostId);
      })
    }
});

export const { extraReducers } = postSlice.actions;
export const selectEditedPosts = (state) => state.posts.posts // Return the entire state
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) =>state.posts.error;



export default postSlice.reducer;
