import './App.css';
import React, { useState } from 'react';
import Menu from "./Menu";
import { useOutletContext } from "react-router-dom";

const App = () => {
  const [anchorPoint, show, handleClickMenu, setShow, currentChar, win, setWin, setGameOver] = useOutletContext();
  const [ clickSpot, setClickSpot] = useState({ x: 0, y: 0 });
  

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
      setWin(true);
      setGameOver(true);
    }

    setShow(false);
  }

  return (
    <div className="App" >
      <header className="App-header">
        <img id='game-img' src="/testing.jpg" onClick={handleClick} className='img-fluid shadow-4' alt="Where's Waldo1" />
      </header>
      <Menu show={show} win={win} anchorPoint={anchorPoint} clickConfirm={clickConfirm}/>
    </div>
  );
}

export default App;
