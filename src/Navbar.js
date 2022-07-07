import React from 'react';
import "./Navbar.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const navbar = ({char, timer}) => {
  
  return (
    <Navbar className="justify-content-center"  bg="light" expand="lg">
      <div className='nav-div'>
        <Navbar.Brand className='nav-content' href="/">Searchle</Navbar.Brand>
        <Navbar.Text className='nav-content'>{timer}</Navbar.Text>
        <Navbar.Text className='nav-content'>
          Search: {char.charName}
          <img src={char.imgUrl} id='nav-char-pic' className='img-thumbnail' alt={char.charName} />
        </Navbar.Text>
      </div>
    </Navbar>
  );
}

export default navbar;