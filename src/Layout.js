import React from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "./Layout.css"

function Layout() {
    return (
      <div className='Layout-header'>
        <div className="navbar">
            <Navbar />
        </div>
        <div className='content'>
            <Outlet/>
        </div>
      </div>
    );
  }

export default Layout;