import React, { useState } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "./Layout.css"
import useContextMenu from "./useContextMenu";
import Footer from "./Footer.js"

function Layout() {
  const { anchorPoint, show, handleClickMenu, setShow } = useContextMenu();
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState(0);
  const [ currentChar, setCurrentChar ] = useState (
    {
      charName: "Sasuke Uchiha",
      imgUrl: "/sasuke uchiha.png",
      xPos: 15,
      yPos: 23
    }
  )

  const clickScreen = e => {
    // e.stopPropagation();
    if (show)
      setShow(false);
  }


  return (
    <div className='Layout-header' onClick={clickScreen}>
      <div className="navbar">
          <Navbar char={currentChar} win={win}/>
      </div>
      <div className='content'>
          <Outlet context={[anchorPoint, show, handleClickMenu, setShow, currentChar, win, setWin]} />
      </div>
      <Footer/>
    </div>
  );
}

export default Layout;