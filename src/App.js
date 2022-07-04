import './App.css';
import React, { useState } from 'react';
import Menu from "./Menu";
import useContextMenu from "./useContextMenu";

function App() {
  const { anchorPoint, show, handleClickMenu, setShow } = useContextMenu();
  const [ clickSpot, setClickSpot] = useState({ x: 0, y: 0 });
  const [ chars, setChars ] = useState ([
    {
      charName: "waldo",
      imgUrl: "./waldo.jpg",
      xPos: 43,
      yPos: 30,
      clicked: false
    },
    {
      charName: "woof",
      imgUrl: "./woof.gif",
      xPos: 50,
      yPos: 12,
      clicked: false
    }
  ])

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

  const clickChar = e => {
    // console.log(e)
    // console.log(chars)
    let clickedChar = e.target.alt;
    let tempChars = chars;

    let x1 = clickSpot.x - 3;
    let x2 = clickSpot.x + 3;
    let y1 = clickSpot.y - 3;
    let y2 = clickSpot.y + 3;
    
    tempChars.forEach(char => {
      if (char.charName === clickedChar && x1 <= char.xPos && x2 >= char.xPos && y1 <= char.yPos && y2 >= char.yPos)
      {
        char.clicked = true;
        console.log(`${char.charName} was clicked` )
      }
    })

    setChars(tempChars)
    setShow(false);
  }

  const clickScreen = e => {
    // e.stopPropagation();
    if (show)
      setShow(false);
  }

  return (
    <div className="App" onClick={clickScreen}>
      <header className="App-header">
        <img src="/wheres-waldo1.jpg" onClick={handleClick} className='img-fluid shadow-4' alt="Where's Waldo1" />
      </header>
      <Menu chars={chars} show={show} anchorPoint={anchorPoint} clickChar={clickChar}/>
    </div>
  );
}

export default App;
