import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPosts } from '../EditPost/PostSlice';

import {selectAllUsers, selectUserId} from '../user/UserSlice';
import '../EditPost/EditPost.css';

function NewPost(props) {


const [data , setData] = useState([]);



const [addRequestStatus,setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const [edit, setEdit] = useState({
    title: '',
    body: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };
  const consave = [edit.title,edit.body].every(Boolean) && addRequestStatus==='idle';
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    const {title,body} = edit;
    if(consave){
        try{
        setAddRequestStatus('pending')
        dispatch(addNewPosts({title,body,userId:data.id })).unwrap();
        alert('Post successfully added!');
        setEdit({title:'',body:""})
 
  
      } catch (error) {
        console.error('Error in new post:', error);
      }
      finally{
        setAddRequestStatus('idle');
      }
    }
  };
useEffect(()=>{
  const val = JSON.parse(localStorage.getItem('item'));
  setData(val);
},[])

  return (
    <>
      <div className='main'>
        <div className='Containered'>
          <form className='form' onSubmit={handleSubmit}>
            <h1 className='title'>New Post</h1>
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
            <label htmlFor='auther' className='lab'>
                Author
            </label>
            <input
              type='text'
              name='title'
              className='inpu'
              value={data.name}
             disabled
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
            <button className='Post-btn' type="submit" disabled={!consave}>
               Post
            </button>
            
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPost;
