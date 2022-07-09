import React, { useState, useEffect } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "../Styles/Layout.css"
import Footer from "./Footer.js"
import ResultsScreen from "./ResultsScreen.js"

function Layout() {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [win, setWin] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] =  useState(0);
  const [miss, setMiss] = useState(false);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(
    {
      minutes: 0,
      seconds: 0,
      misses: 0,
    }
  );

  const [ currentChar, setCurrentChar ] = useState (
    {
      charName: "Sasuke Uchiha",
      source: "Naruto",
      imgUrl: "/sasuke uchiha.png",
      xPos: 15,
      yPos: 23
    }
  )

  const handleClickMenu = (event) => {
    event.preventDefault();
    if (!miss)
      setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShow(true);
}

  const clickScreen = e => {
    if (e.target.id !== 'game-img' && e.target.id !== 'checkmark' && e.target.className !== 'circle-div' && e.target.nodeName !== 'path')
    {
      console.log(e)
      setShow(false);
    }
  }

  const endGame = () => {
    setResults(
      {
        minutes: minutes,
        seconds: seconds,
        misses: misses,
      }
    );
    setGameOver(true);
    setShowResults(true);
  }

  useEffect(
    () => {let interval;
      if (!gameOver) {
        interval = setInterval(() => {
          if (seconds < 59) {
            setSeconds(seconds => seconds + 1);
          }
          else  {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
          } 
        }, 1000);
      } else if (gameOver) {
        clearInterval(interval);
      }

      // when component unmounts stops timer / clearInterval
      return () => {
        clearInterval(interval);
      };
    },
    [gameOver, seconds]
  );

  return (
    <div className='Layout-header' onClick={clickScreen}>
      <div className="navbar">
          <Navbar char={currentChar} minutes={minutes} seconds={seconds}/>
      </div>
      <div className='content'>
          <Outlet context={[anchorPoint, show, handleClickMenu, setShow, currentChar, win, setWin, miss, setMiss, misses, setMisses, endGame]} />
      </div>
      <ResultsScreen showResults={showResults} setShowResults={setShowResults} results={results}/>
    </div>
  );
}

export default Layout;