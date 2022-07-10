import React, { useState, useEffect } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "../Styles/Layout.css"
import InfoScreen from './InfoScreen';
import StatsScreen from './StatsScreen';
import fx from 'fireworks'

function Layout() {
  const fireworks = require('fireworks')

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [hit, setHit] = useState(false);
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
      bestStreak: 2,
      minutes: 0,
      seconds: 0,
      bestMinutes: 0,
      bestSeconds: 23
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

  // const [ currentChar, setCurrentChar ] = useState (
  //   {
  //     charName: "The Knight",
  //     source: "Hollow Knight",
  //     imgUrl: "/hollow knight.png",
  //     xPos: 59,
  //     yPos: 82
  //   }
  // )

  const handleClickMenu = (event) => {
    event.preventDefault();
    if (!miss)
      setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShow(true);
}

  const clickScreen = e => {
    if (e.target.id !== 'game-img' && e.target.id !== 'checkmark' && e.target.className !== 'circle-div'
      && e.target.nodeName !== 'path' && e.target.id !== 'miss-icon' && e.target.id !== 'aiming')
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
        bestStreak: stats.bestStreak + 1,
        minutes: minutes,
        seconds: seconds,
        bestMinutes: stats.bestMinutes,
        bestSeconds: stats.bestSeconds
      }
    );
    setGameOver(true);
    setShowStats(true);

    callFireworks();
  }

  const callFireworks = () => {
    fx({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 50,
      colors: ['#faa622', '#ffe52c', '#7fe6ef', '#c4d70c', '#c22303'],
      count: 100,
      canvasWidth: 600,
      canvasHeight: 800,
    })
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
          <Outlet context={[anchorPoint, show, handleClickMenu, setShow, currentChar, hit, setHit, miss, setMiss, endGame, gameOver]} />
      </div>
      <StatsScreen gameOver={gameOver} showStats={showStats} setShowStats={setShowStats} stats={stats}
        char={currentChar} />
      <InfoScreen showInfo={showInfo} setShowInfo={setShowInfo} char={currentChar} firstVisit={firstVisit}
        setFirstVisit={setFirstVisit} gameOver={gameOver} />
    </div>
  );
}

export default Layout;