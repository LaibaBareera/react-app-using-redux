import React,{useState} from 'react';
import Comments from '../Comments/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostUser from '../user/PostUser';
import { deletePost } from '../EditPost/PostSlice';
import EditPost from '../EditPost/EditPost';
import { selectUserId } from '../user/UserSlice';

function PostExcept({ post }) {
    const [postOpenState,setPostOpenState] = useState([]);
    const userId = useSelector(selectUserId);
    const [postEditOpenState,setPostEditOpenState] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const toggleComment = (postId) => {
        setPostOpenState((prevState) => ({
          ...prevState,
          [postId]: !prevState[postId],
        }));
      };
      const toggleEdit = (userid,postId) => {
        if(userid===userId){ 
        setPostEditOpenState((prevState) => ({
          ...prevState,
          [postId]: !prevState[postId],
        }));
      }
      else{
        alert('you can only edit your post')
      }
      };
      const handleDeletePost = (postId,userid) => {
      if(userid===userId)
        {  dispatch(deletePost(postId));}
        else{
          alert('You can only delete your post')
        }
      };
    return (
        <>
            <div className="card">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{ `"${post.body}"`}</p>
            <div style={{paddingLeft:'50%'}}> <p style={{fontWeight:'700'}} >by:  <PostUser userId={post.userId}/> </p></div>
               
              
              <div className="row">
                <div className="col">
                  <button className='btn btn-primary' onClick={() => toggleComment(post.id)}>
                     Comment
                  </button>
                </div>
                <div className="col colu">
                  <button className='btn btn-primary' style={{ marginLeft: '25%' }} onClick={() => {
                    toggleEdit(post.userId,post.id)
                  }}> Edit</button>
                </div>
                <div className="col colu">
                <button className='btn btn-primary' style={{ marginLeft: '25%' }} onClick={()=>{handleDeletePost(post.id,post.userId)}}>  Delete</button>
                 
                </div>
              </div>
              {postOpenState[post.id] && <Comments postId={post.id} />}
              {postEditOpenState[post.id] && <EditPost id={post.id}/>}
            </div>
          </div>
        </>
    );
}

export default PostExcept;