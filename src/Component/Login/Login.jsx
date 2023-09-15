import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useDispatch } from "react-redux";
import { setUserId } from "../user/UserSlice";
import Cookies from 'js-cookie'; // Import js-cookie
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../user/UserSlice';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const validate = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

function Login(props) {
  const [userd,setUserd] = useState([]);

  const dispatch = useDispatch();
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);
  const getData = async()=>{
    const data = await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
    });
    var res = await data.json();
    setUserd(res);
    
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
     
      const user = userd.find((val) => val.email === values.email);
      
      if (!user) {
        setError('Invalid credentials - User not found');
      } else if (user.username === values.password) {
       
           Cookies.set('isLoggedIn', 'true');
           localStorage.setItem('item',JSON.stringify(user));
        // Password matches, navigate to the desired page.
        dispatch(setUserId(user.id));
       navigate('/home');
       
      } else {
        // Password is incorrect.
        setError('Invalid credentials - Incorrect password');
      }
    }
    
  });
useEffect(()=>{
  getData()
},[]);
  const toggler = () => {
    setPass((prev) => !prev);
  };


  return (
    <>
    <div className='main'>
      <div className='Container'>
        <form className='form' onSubmit={formik.handleSubmit}>
          <h1 className='title'>Sign in</h1>
             {/* ... (form input fields) */}
             {error && <div style={{ color: 'red' ,marginLeft:'10vh'}}>{error}</div>}
        
          <label htmlFor='email' className='lab'>
            Email
          </label>
          <input
            type='text'
            name='email'
            placeholder='Enter Email'
            className='inpu'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }} className='error'>
              {formik.errors.email}
            </div>
          ) : null}
          <label htmlFor='password' className='lab'>
            Password
          </label>
          <div className='pa'>
            <input
              type={pass === true ? 'text' : 'password'}
              name='password'
              placeholder='Enter Password'
              className='inp'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {pass === true ? (
              <VisibilityOffIcon className='ico' onClick={toggler} />
            ) : (
              <VisibilityIcon className='ico' onClick={toggler} />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }} className='error'>
              {formik.errors.password}
            </div>
          ) : null}
        
          <button className='login-btn' type='submit'>
            Login
          </button>
          <hr className='line' />
          <Link to={'/signup'} className='link'>
            Create new Account{' '}
            <span style={{ color: 'black', paddingLeft: '1vh' }}> SignUp</span>
          </Link>
        </form>
      </div>
    </div>
  </>
  );
}

export default Login;
