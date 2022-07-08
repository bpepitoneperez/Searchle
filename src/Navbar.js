import React from 'react';
import "./Navbar.css"
import Navbar from 'react-bootstrap/Navbar';

const navbar = ({char, minutes, seconds}) => {
  
  return (
    <Navbar fixed="top" className="justify-content-center"  bg="light" expand="lg">
      <div className='nav-div'>
        <Navbar.Brand className='nav-content' href="/">Searchle</Navbar.Brand>
        <Navbar.Text id='nav-timer' className='nav-content'>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Navbar.Text>
        <Navbar.Text className='nav-content'>
          Search: {char.charName}
          <img src={char.imgUrl} id='nav-char-pic' className='img-thumbnail' alt={char.charName} />
        </Navbar.Text>
      </div>
    </Navbar>
  );
}

export default navbar;