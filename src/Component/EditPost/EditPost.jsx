import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPosts,fetchPosts, selectEditedPosts } from './PostSlice';
import { Link } from 'react-router-dom';

import './EditPost.css';
import { selectUserId } from '../user/UserSlice';

function EditPost({id}) {
const post = useSelector(selectEditedPosts);
const data = post.find((val)=>val.id===id);
const userId = useSelector(selectUserId);
    const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    title: '',
    body: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        dispatch(editPosts({ id:Number(id),userId:Number(userId),title: edit.title, body: edit.body }))
        .then(() => {
          // After successfully editing the post, refetch the updated list of posts
          setEdit({
            title: '',
            body: '',
          })
          alert('Post updated successfully!');
      
          // Navigate back to the Post page or perform any other action as needed
        });;
    

    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  
const getData= ()=>{
  setEdit({title:data.title,body:data.body});
}
  useEffect(() => {
    getData()
  }, [id]);

  return (
    <>
    
      <div className='mains'>
        <div className='Containere'>
          <form className='form' onSubmit={handleSubmit}>
          
            <label htmlFor='title' className='lab'>
              Title
            </label>
            <input
              type='text'
              name='title'
              placeholder='Enter Title'
              className='inpu'
              value={edit.title}
              onChange={handleInputChange}
            />

            <label htmlFor='body' className='lab'>
              Content
            </label>
         
              <textarea
                name='body'
                placeholder='Enter Content'
                className='inpa'
                
                value={edit.body}
                onChange={handleInputChange}
              />
            <button className='edit-btn' type="submit">
              Update Post
            </button>
          
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPost;


