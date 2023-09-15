import React, { useEffect, useState } from 'react';
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addNewComment, editComment, fetchComment, getComment } from './CommentSlice';
import { selectAllUsers, selectUserId } from '../user/UserSlice';
function Comments({postId}) {
    const com = useSelector(getComment);
    const comment = com.filter(val=>(val.postId===postId));
    console.log(com);
    const dispatch = useDispatch(); 
  const [body, setBody] = useState("");
  const userId = useSelector(selectUserId);
  const users = useSelector(selectAllUsers);
  const user = users.find(val => val.id===userId);
  
  
const handleDelete= (name)=>{
if(name===user.name){
try{
    dispatch(fetchComment(postId));
}
catch(err){
    console.log(err);
}
}
else{
    alert('You can only delete your Comment')
  }

}
console.log(user);
const handleEdit = (id,name)=>{
    // if(name===user.name){
    try{
        dispatch(editComment({id,postId,name:user.name,
            email:user.email,body}));
    }
    catch(err){
        console.log(err);
    }
// }
// else{
//     alert('you can only edit your comment')
// }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
        dispatch(addNewComment({
            postId,
            name:user.name,
            email:user.email,
            body
        }));
        alert('Comment successfully added!');
        setBody("");
 
  
      } catch (error) {
        console.error('Error in comment:', error);
      }
    
    
  };

    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

useEffect(()=>{
    dispatch(fetchComment(postId));
},[])
    return (
        <div className='container'>
           {comment? comment.map((val)=>(
            <>
                <div className='bv2_event' key={val.id}>
                    <div className='bv2_content'>
                <h4 className='bv2'>
                    <span className='bv2_user_name'> {truncate(val.name,20)}</span>
                    <span className='bv2_info'>
                        {val.email}
                    </span>
                    <button className='edit' onClick={() => handleEdit(val.id,val.name)}>
                    <EditIcon/>
                    </button>
                   
                    <button className='del' onClick={() => handleDelete(val.name)}>
  <DeleteIcon className='delete' />
</button>
                </h4>
            </div>
            <div className='bv2_msg critical-feature data'>
                <div className='flex-kids-x space-between'>
                <div className='flex-kids-y flex-1-hemmed ' >
                    
                    <p className='budy'>
                    {val.body}
                    </p>
                </div>
                <div className='flex-kids-y justify-space-between'>

                </div>

                </div>
            </div>
                </div>
            </>
           )):<p>No comment</p>}
           <div>
            <form onSubmit={handleSubmit}>
                <textarea
                type='text'
                    placeholder='Enter comment'
                    value={body}
                    className='input'
                    onChange={(e)=>{setBody(e.target.value)}}
                    name='body'
                />
                <button className='btn btn-primary' style={{marginLeft:'40%'}}>Comment</button>
            </form>
           </div>
        </div>
    );
}

export default Comments;