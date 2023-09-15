import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Component/EditPost/PostSlice';
import commentReducer from './Component/Comments/CommentSlice'
import userReducer from './Component/user/UserSlice'
const store = configureStore({
    reducer: {
      posts: postsReducer,
      users: userReducer,
      comment: commentReducer
    },
  });
  export default store;