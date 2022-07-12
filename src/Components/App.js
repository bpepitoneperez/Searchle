import '../Styles/App.css';
import React, { useState } from 'react';
import ClickConfirm from "./ClickConfirm";
import { useOutletContext } from "react-router-dom";

const App = () => {
  const [anchorPoint, show, handleClickMenu, setShow, currentChar, hit, setHit, miss, setMiss, endGame, gameOver] = useOutletContext();
  const [clickSpot, setClickSpot] = useState({ x: 0, y: 0 });

  const handleClick = e => {
    e.preventDefault();
    
    const x = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const y = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    setClickSpot({x: x, y: y});
    console.log(clickSpot)

    handleClickMenu(e);
  }

  const clickConfirm = e => {
    // console.log(e)
    // console.log(chars)
    let x1 = clickSpot.x - 5;
    let x2 = clickSpot.x + 5;
    let y1 = clickSpot.y - 5;
    let y2 = clickSpot.y + 5;
    
    if (x1 <= currentChar.xPos && x2 >= currentChar.xPos && y1 <= currentChar.yPos && y2 >= currentChar.yPos)
    {
      setHit(true);
      setTimeout(() => {
        setShow(false);
        endGame();
      }, 400);
    }
    else
    {
      setMiss(true);
      setTimeout(() => {
        setMiss(false);
        setShow(false);
      }, 400);
    }
  }

  return (
    <div className="App" >
      <header className="App-header">
        <img id='game-img' src="/imgs/testing.jpg" onClick={handleClick} className='img-fluid shadow-4' alt="Where's Waldo1" />
        <ClickConfirm show={show} hit={hit} anchorPoint={anchorPoint} clickConfirm={clickConfirm} miss={miss} gameOver={gameOver}/>
      </header>
    </div>
  );
}

export default App;
