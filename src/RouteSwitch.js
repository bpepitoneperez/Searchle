import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Components/App";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";
import { getCurrentImage } from './Utils/loadimage'
import { getCurrentCharacter } from './Utils/loadcharacter'
import { getCurrentGame } from './Utils/loadcurrentgame'

const RouteSwitch = () => {
  const [image, setImage] = useState({});
  const [character, setCharacter] = useState({});
  const [currentGame, setCurrentGame] = useState({});

  useEffect(() => {
    setImage(getCurrentImage());
    setCharacter(getCurrentCharacter());
    setCurrentGame(getCurrentGame());
    
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout image={image} setImage={setImage}
                character={character} setCharacter={setCharacter}
                currentGame={currentGame} setCurrentGame={setCurrentGame} />} >
          <Route index element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;