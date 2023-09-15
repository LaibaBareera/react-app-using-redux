// postSlice.js
import { createSlice, nanoid,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {sub} from 'date-fns'

const onlyCommentURL = 'https://jsonplaceholder.typicode.com/comments';

const initialState = {
  comment: [], // An array to store comments
  status: 'idle',
  error: null,
};
export const fetchComment = createAsyncThunk('comment/fetchComment',async() => {
  try{
    const response = await axios.get(onlyCommentURL);
    return {comment: response.data}; // Store comments for a specific post

  }
  catch(error ){
    return error.message;
  }
});
export const addNewComment = createAsyncThunk('comment/addNewComment',async({postId,name,email,body}) => {
  try{
    const response = await axios.post(onlyCommentURL,{postId,name,email,body});
    return {comment: response.data};
  }
  catch(error ){
    return error.message;
  }
})
export const editComment = createAsyncThunk('comments/editcomment', async (updatedComment) => {
  try{
    const { id, ...restOfUpdatedPost } = updatedComment;
    const response = await axios.put(`${onlyCommentURL}/${id}`,restOfUpdatedPost);
    return {comment: response.data};
  }
  catch(error ){
    return error.message;
  }
});
const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers(builder){
      builder
      .addCase(fetchComment.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchComment.fulfilled,(state,action)=>{
        // debugger
        state.status = 'succeeded';
        state.comment = action.payload.comment;
      
      })
      .addCase(fetchComment.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled,(state,action)=>{
        action.payload.postId = Number(action.payload.postId);
        const newComment = action.payload.comment;
        state.comment.push(newComment); 
      })

      .addCase(editComment.fulfilled,(state,action)=>{
        const updatedComment = action.payload.comment;
        console.log(updatedComment.id);
        // Find the index of the comment within the state
        const commentIndex = state.comment.findIndex((comment) => comment.id === updatedComment.id);
        console.log(commentIndex);
        if (commentIndex !== -1) {
          // Update the comment within the state
          state.comment[commentIndex] = updatedComment;
        }
     
      })
 
    }
});

export const { extraReducers } = CommentSlice.actions;
// Return the entire state
export const getCommentStatus = (state) => state.comment.status;
export const getCommentError = (state) =>state.comment.error;
export const getComment = (state)=> state.comment.comment;


export default CommentSlice.reducer;
