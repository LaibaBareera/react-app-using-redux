    import React, { useState } from 'react';
    import './Navbar.css'
    import { useSelector } from "react-redux";
    import { Link } from 'react-router-dom';
    import Cookies from 'js-cookie';


    function Navbar({openSidebar}) {
       
        const handleLogout = () => {
            // Delete the isLoggedIn cookie to log the user out
            Cookies.remove('isLoggedIn');
            localStorage.removeItem('item');
            // Redirect the user to the login page or perform any other necessary actions
            window.location.href = '/'; // Redirect to the login page
          };
        return (
            
            <div>
                <nav className="navbar topNav navbar-expand-lg navbar-light bg-light">
                <span className="navbar-toggler-icon ic" onClick={openSidebar}></span>
    <Link className="navbar-brand" to={`/`}>Navbar</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link" to={`/`}>Home <span className="sr-only"></span></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/post">Post</Link>
        </li>
       
        <li className="nav-item ">
            <Link className="nav-link" onClick={handleLogout}>Logout <span className="sr-only"></span></Link>
        </li>
        </ul>
    </div>
  
    

    </nav>
            </div>
        );
    }

    export default Navbar;