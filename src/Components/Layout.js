import React, { useState, useEffect } from 'react';
import {  Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import "../Styles/Layout.css"
import InfoScreen from './InfoScreen';
import StatsScreen from './StatsScreen';
import LoadingScreen from './LoadingScreen';
import FireworksComponent from './FireworksComponent';
import { getResultsText } from '../Utils'
import axios from "../Utils/axios";

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
  const [stats, setStats] = useState(
    {
      played: 0,
      wins: 0,
      percent: 0,
      streak: 0,
      bestStreak: 0,
      minutes: 0,
      seconds: 0,
      bestMinutes: 0,
      bestSeconds: 0,
      times: {
        thirtyOrLess: 0,
        oneOrLess: 0,
        oneThirtyOrLess: 0,
        twoOrLess: 0,
        twoThirtyOrLess: 0,
        threeOrLess: 0
      }
    }
  );
  useEffect(() => {
    
    if (process.env.NODE_ENV === 'production')
    {
      // GET request using axios inside useEffect React hook
      axios.get('/images/latest')
      .then(function (response) {
        // handle success
        setImage(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log('Get image latest',error);
      })
      .then(function () {
        // always executed
      });

      axios.get('/characters/latest')
      .then(function (response) {
        // handle success
        setCharacter(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log('Get character latest',error);
      })
      .then(function () {
        // always executed
      });
    }
    else
    {
      setDefaultImage();
    }
    
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  const setDefaultImage = () => {
    setImage(
      {
        _id:"62ce2c5060d9fbfcd8e3a0ef",
        title:"Dreamcast Explosion",
        author:"Pierre Roussel",
        authorUrl:"https://www.etsy.com/shop/Angerinet",
        imgUrl:"/imgs/pierre-roussel-dreamcast-web.jpg",
        characters:["62ce2c4f60d9fbfcd8e3a0e1","62ce2c4f60d9fbfcd8e3a0e2","62ce2c4f60d9fbfcd8e3a0e3","62ce2c4f60d9fbfcd8e3a0e4","62ce2c4f60d9fbfcd8e3a0e0"],
        __v:0
      }
      );
    
      setCharacter(
      {
        _id:"62ce2c4f60d9fbfcd8e3a0e0",
          name:"Mew",
          source:"Jet Set Radio",
          xPos:66,
          yPos:73,
          charUrl:"/chars/mew-jsr.png",
          __v:0
      }
      );
  }


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

    
    
    let results = getResultsText(minutes, seconds, shareText, stats.times)

    setShareText(results[0])

    setResultsBar(results[1])

    let tempTimes = results[2];

    setStats(
      {
        played: stats.played + 1,
        wins: stats.wins + 1,
        percent: 100,
        streak: stats.streak + 1,
        bestStreak: stats.bestStreak + 1,
        minutes: minutes,
        seconds: seconds,
        bestMinutes: minutes,
        bestSeconds: seconds,
        times: tempTimes
      }
    );
    
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

  if (image.imgUrl && character.charUrl)
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
          char={character} handleShareClick={handleShareClick} resultsBar={resultsBar} showAlert={showAlert}/>
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