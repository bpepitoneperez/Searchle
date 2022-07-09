import React, { useState, useEffect } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "../Styles/Layout.css"
import InfoScreen from './InfoScreen';
import StatsScreen from './StatsScreen';

function Layout() {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [win, setWin] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] =  useState(0);
  const [miss, setMiss] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [stats, setStats] = useState(
    {
      played: 2,
      wins: 2,
      percent: 100,
      streak: 2,
      minutes: 0,
      seconds: 0
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

    if(showStats)
      setShowStats(false);
  }

  const endGame = () => {
    setStats(
      {
        played: stats.played + 1,
        wins: stats.wins + 1,
        percent: stats.percent,
        streak: stats.streak + 1,
        minutes: minutes,
        seconds: seconds
      }
    );
    setGameOver(true);
    setShowStats(true);
  }

  useEffect(
    () => {let interval;
      if (!gameOver && !showInfo) {
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
    [gameOver, seconds, showInfo]
  );

  return (
    <div className='Layout-header' onClick={clickScreen} >
      <div className="navbar">
          <Navbar showStats={showStats} setShowStats={setShowStats} showInfo={showInfo}
            setShowInfo={setShowInfo} setFirstVisit={setFirstVisit} />
      </div>
      <div className='content'>
          <Outlet context={[anchorPoint, show, handleClickMenu, setShow, currentChar, win, setWin, miss, setMiss, endGame]} />
      </div>
      <StatsScreen gameOver={gameOver} showStats={showStats} setShowStats={setShowStats} stats={stats} />
      <InfoScreen showInfo={showInfo} setShowInfo={setShowInfo} char={currentChar} firstVisit={firstVisit}
        setFirstVisit={setFirstVisit} gameOver={gameOver} />
    </div>
  );
}

export default Layout;