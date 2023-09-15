import React from 'react';
import Navbar from './Navbar/Navbar';
import { useState } from 'react';
import SideBar from './Sidebar/SideBar';

function Layout(props) {
    const [sidebar,setSidebar] = useState(false); 
    const toogleSidebar = ()=>{
        setSidebar((prevState)=> !prevState);
    }
    return (
        <>
          <Navbar openSidebar={toogleSidebar}/>
          <SideBar sidebar= {sidebar}/>  
        </>
    );
}

export default Layout;