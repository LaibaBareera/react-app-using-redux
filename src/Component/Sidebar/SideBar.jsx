import React from 'react';
import './SideBar.css'
import { useNavigate } from 'react-router-dom';


function Sidebar({sidebar}) {
  const navigate = useNavigate();
  return (
    <>
              <div className={sidebar?'sidebar sidebar--open':"sidebar"}>
          <li onClick={()=>{
            navigate(`/`)
          }}>
            Home
          </li>
          <li onClick={()=>{
            navigate('/dashboard')
          }}>
            Dashboard
          </li>
          <li onClick={()=>{
            navigate('/post')
          }}>
        
          Post
           
          </li>
         
          <li>
            Chart          
          </li>
          <li>
           Graph
          </li>

        </div>
    </>
  );
}

export default Sidebar;