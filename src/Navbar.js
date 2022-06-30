import React from 'react';
import {  Link } from "react-router-dom";

const navbar= () =>{
  return (
  <div>
    <p>Search for Susa</p>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/leaderboard">Leaderboard</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </div>
  );
}

export default navbar;