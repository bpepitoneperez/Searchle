import React from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "./Layout.css"
import useContextMenu from "./useContextMenu";

function Layout() {
  const { anchorPoint, show, handleClickMenu, setShow } = useContextMenu();

  const clickScreen = e => {
    // e.stopPropagation();
    if (show)
      setShow(false);
  }


    return (
      <div className='Layout-header' onClick={clickScreen}>
        <div className="navbar">
            <Navbar />
        </div>
        <div className='content'>
            <Outlet context={[anchorPoint, show, handleClickMenu, setShow]} />
        </div>
      </div>
    );
  }

export default Layout;