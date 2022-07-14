import '../Styles/App.css';
import React, { useState } from 'react';
import ClickConfirm from "./ClickConfirm";
import { useOutletContext } from "react-router-dom";

const App = () => {
  const [anchorPoint, show, handleClickMenu, setShow, character, hit, setHit, miss, setMiss, endGame, gameOver, image] = useOutletContext();
  const [clickSpot, setClickSpot] = useState({ x: 0, y: 0 });

  let imgUrl = "Searchle" + image.imgUrl

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
    
    if (x1 <= character.xPos && x2 >= character.xPos && y1 <= character.yPos && y2 >= character.yPos)
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
        <img id='game-img' src={imgUrl} onClick={handleClick} className='img-fluid shadow-4' alt={image.title} />
        {/* <img id='game-img' src="/imgs/pierre-roussel-xbox360-web.jpg" onClick={handleClick} className='img-fluid shadow-4' alt={image.title} /> */}
        <ClickConfirm show={show} hit={hit} anchorPoint={anchorPoint} clickConfirm={clickConfirm} miss={miss} gameOver={gameOver}/>
      </header>
    </div>
  );
}

export default App;
