import './App.css';
import Layout from './Component/Layout';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Login from './Component/Login/Login';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Signup from './Component/Signup/Signup';
import Post from './Component/Post/Post';
import EditPost from './Component/EditPost/EditPost';
import NewPost from './Component/NewPost/NewPost';
import Profile from './Component/Profile';
import { selectAuth } from './Component/user/UserSlice';
import MyPost from './Component/Post/MyPost';
import Dashboard from './Component/Dashboard/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false);


  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('item');
    const isAuthenticated = Boolean(token);
  
    setAuth(isAuthenticated);
  }, []);


  return (
    <>
    <Routes>
      {/* Check if the user is authenticated */}
      {auth ? (
        <>
          <Route
            path='/'
            element={
              <>
                {/* Redirect authenticated users to the home page */}
                <Layout />
                <Outlet />
              </>
            }
          >
            <Route path='/' element={<Profile />} />
            <Route path='/home' element={<Profile />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/post' element={<Post />} />
            <Route path='/mypost/:id' element={<MyPost />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </>
      ) : (
        <>
          {/* Redirect unauthenticated users to the login page */}
          <Route path='/' element={<Login />} />
          <Route
            path='/login'
            element={<Login />}
            // Optionally, you can use `caseSensitive` to make the route case-sensitive
            caseSensitive
          />
        </>
      )}
    </Routes>
  </>
  );
}

export default App;
