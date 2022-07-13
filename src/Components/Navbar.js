import React from 'react';
import "../Styles/Navbar.css"
import Navbar from 'react-bootstrap/Navbar';
import { MdLeaderboard } from "react-icons/md";
import { MdBrush } from "react-icons/md";
import { MdHelp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const navbar = ({showStats, setShowStats, showInfo, setShowInfo, setFirstVisit, image}) => {
  // {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}


  const clickInfo = (e) => {
    setShowInfo(true);
  }

  const clickStats = (e) => {
    setShowStats(true);
  }

  const clickNav = (e) => {
    if (showInfo)
    {
      setShowInfo(false);
      setFirstVisit(false);
    }

    if (showStats)
      setShowStats(false);
  }
  
  return (
    <Navbar id='navbar' fixed="top" onClick={clickNav}>
      <div className='nav-div'>
        <div id='nav-div-left' className='nav-content'>
          <div className='nav-link-div' onClick={clickStats}><MdLeaderboard /></div>
          <div className='nav-link-div' onClick={clickInfo}><MdHelp /></div>
        </div>
        <div id='nav-div-middle' className='nav-content'>
          <div id='nav-brand'>Searchle(beta)</div>
        </div>
        <div id='nav-div-right' className='nav-content'>
          <div className='nav-link-div'>
            <a id='nav-artist' className="nav-link" href={image.authorUrl} target="_blank" rel="noreferrer">
                <MdBrush />
            </a>
          </div>
          <div className='nav-link-div'>
            <a id='nav-github' className="nav-link" href="https://github.com/BryanSkyyy" target="_blank" rel="noreferrer">
                <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default navbar;