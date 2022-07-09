import React from 'react';
import "../Styles/Navbar.css"
import Navbar from 'react-bootstrap/Navbar';
import { MdLeaderboard } from "react-icons/md";
import { MdBrush } from "react-icons/md";
import { MdHelp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const navbar = ({char, minutes, seconds}) => {
  // {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}
  
  return (
    <Navbar id='navbar' fixed="top" >
      <div className='nav-div'>
        <div id='nav-div-left' className='nav-content'>
          <div className='nav-link-div'><MdLeaderboard /></div>
          <div className='nav-link-div'><MdHelp /></div>
        </div>
        <div id='nav-div-middle' className='nav-content'>
          <div id='nav-brand'>Searchle</div>
        </div>
        <div id='nav-div-right' className='nav-content'>
          <div className='nav-link-div'><MdBrush /></div>
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