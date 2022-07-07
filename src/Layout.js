import React, { useState } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "./Layout.css"
import useContextMenu from "./useContextMenu";
import Footer from "./Footer.js"
import ResultsScreen from "./ResultsScreen.js"

function Layout() {
  const { anchorPoint, show, handleClickMenu, setShow } = useContextMenu();
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState("0:08");
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState(
    {
      time: 0,
      win: false,
    }
  );

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
          <Navbar char={currentChar} timer={timer}/>
      </div>
      <div className='content'>
          <Outlet context={[anchorPoint, show, handleClickMenu, setShow, currentChar, win, setWin, setGameOver]} />
      </div>
      <Footer/>
      <ResultsScreen gameOver={gameOver} results={results}/>
    </div>
  );
}

export default Layout;