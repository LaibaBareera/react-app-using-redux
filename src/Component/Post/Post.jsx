import React, { useEffect } from 'react';
import './Post.css';
import { useSelector,useDispatch } from 'react-redux';
import PostExcept from './PostExcept';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

import { fetchPosts, selectEditedPosts,getPostsError,getPostsStatus } from '../EditPost/PostSlice';
import NewPost from '../NewPost/NewPost';
function Post(props) {
 const posts = useSelector(selectEditedPosts);
 
 const postStatus = useSelector(getPostsStatus);
 const posterror = useSelector(getPostsError); 
 const dispatch = useDispatch();


useEffect(()=>{
        dispatch(fetchPosts())
},[dispatch])
let content;


if(postStatus==='loading'){
    // console.log('load');
    content= <p>"Loading...</p>
}
else if(postStatus==='succeeded'){
    // console.log('succed');
 
  content = posts.map(val => <PostExcept key={val.id} post={val}/>)
}
else if(postStatus==='failed'){
    // console.log('error');
    content = <p>{posterror}</p>
}
else if (postStatus === 'idle') {
    // If the initial state is empty and no data has been fetched yet, display a message
    // const orderedPost = posts.slice().sort((a,b)=>b.date.localCompare(a.date));
    
    content = posts.map(val => <PostExcept key={val.id} post={val}/>)
  }
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
    <MDBContainer className="py-5 h-100">
        <MDBRow className=" h-100">
          <MDBCol lg="9" xl="7">
          <NewPost/>
          </MDBCol>
          </MDBRow>
          <hr/>
          <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
    <div className='main_post'>
 
     {content}
    </div>
    </MDBCol>
</MDBRow>
</MDBContainer>
    </div>
  );
}

export default Post;
