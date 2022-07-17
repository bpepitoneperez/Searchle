import React, { useState, useEffect } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "../Styles/Layout.css"
import InfoScreen from './InfoScreen';
import StatsScreen from './StatsScreen';
import LoadingScreen from './LoadingScreen';
import FireworksComponent from './FireworksComponent';
import { getNewStats } from '../Utils/updatestats'
import { checkLocalstorage } from '../Utils/localstoragestats'
import { getCurrentImage } from '../Utils/loadimage'
import { getCurrentCharacter } from '../Utils/loadcharacter'
import { getCurrentGame } from '../Utils/loadcurrentgame'
import _ from 'lodash'

function Layout() {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [hit, setHit] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] =  useState(0);
  const [miss, setMiss] = useState(false);
  const [resultsBar, setResultsBar] = useState('0')
  const [shareText, setShareText] = useState('Searchle Beta')
  const [gameOver, setGameOver] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [image, setImage] = useState({});
  const [character, setCharacter] = useState({});
  const [currentGame, setCurrentGame] = useState({});
  const [stats, setStats] = useState(checkLocalstorage());

  useEffect(() => {
    setImage(getCurrentImage());
    setCharacter(getCurrentCharacter());
    setCurrentGame(getCurrentGame());
    
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(currentGame))
    {
      if (stats.lastGamePlayed === currentGame.current)
      {
        setShowInfo(false);
        setFirstVisit(false);
        setGameOver(true);
        setResultsBar(stats.lastResultsBar)
        setShowStats(true);
        setShareText(stats.lastShareText);
      }

      localStorage.setItem('stats', JSON.stringify(stats));
    }
    
  }, [stats, currentGame]);

  const handleClickMenu = (event) => {
    event.preventDefault();
    if (!miss)
      setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShow(true);
  }

  const handleShareClick = (e) => {
    navigator.clipboard.writeText(shareText)
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const clickScreen = e => {
    if (e.target.id !== 'game-img' && e.target.id !== 'checkmark' && e.target.className !== 'circle-div'
      && e.target.nodeName !== 'path' && e.target.id !== 'miss-icon' && e.target.id !== 'aiming')
    {
      console.log(e);
      setShow(false);
    }

    if(showStats && e.target.id !== 'stats-share-button')
      setShowStats(false);
  };

  const endGame = () => {
    setGameOver(true);
    
    let results = getNewStats(currentGame.current, minutes, seconds, shareText, stats)

    setShareText(results[0])

    setResultsBar(results[1])

    setStats(results[2]);
    
    setShowStats(true);

    setShowFireworks(true);

    setTimeout(() => {
      setShowFireworks(false);
    }, 1500);
  };

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

  if (!_.isEmpty(image) && !_.isEmpty(character))
  {
    return (
      <div className='Layout-header' onClick={clickScreen} >
        <div className="navbar">
            <Navbar showStats={showStats} setShowStats={setShowStats} showInfo={showInfo}
              setShowInfo={setShowInfo} setFirstVisit={setFirstVisit} image={image} />
        </div>
        <div className='content'>
            <Outlet context={[anchorPoint, show, handleClickMenu, setShow, character, hit, setHit, miss, setMiss, endGame, gameOver, image]} />
        </div>
        <StatsScreen gameOver={gameOver} showStats={showStats} setShowStats={setShowStats} stats={stats}
                  char={character} handleShareClick={handleShareClick} resultsBar={resultsBar}
                  showAlert={showAlert} />
        <InfoScreen showInfo={showInfo} setShowInfo={setShowInfo} char={character} firstVisit={firstVisit}
                  setFirstVisit={setFirstVisit} gameOver={gameOver} image={image}/>
        <FireworksComponent showFireworks={showFireworks} />
      </div>
    );
  }

  return (
    <div className='loading-div' >
      <LoadingScreen />
    </div>
  );
  
  
}

export default Layout;