import React from "react";
import { MdClose } from "react-icons/md";
import BarChart from "./BarChart";
import Alert from 'react-bootstrap/Alert';
import Countdown from 'react-countdown';

import "../Styles/StatsScreen.css"

const StatsScreen = ({gameOver, showStats, setShowStats, stats, char, resultsBar, handleShareClick, showAlert}) => {
    const minutes = stats.minutes;
    const seconds = stats.seconds;
    const bestMinutes = stats.bestMinutes;
    const bestSeconds = stats.bestSeconds;
    let today = new Date()
    let tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const closeStats = () => {
      setShowStats(false);
    }

    const statasticsTopBar = <div id='stats-close-div'><MdClose id='stats-close' onClick={closeStats}/></div>;

    const statisticsPanel = <div id='stats-panel' className="stats-page-panel">
      <h1 className='stats-header'>STATISTICS (in progress)</h1>
      <div id='stats-section'>
        <div className='stat-item'>
          <p id='played' className="stat">{stats.played}</p>
          <p className='stat-descriptor'>Played</p>
        </div>
        <div className='stat-item'>
          <p id='win-percent' className="stat">{stats.percent}</p>
          <p className='stat-descriptor'>Win %</p>
        </div>
        <div className='stat-item'>
          <p id='current-streak' className="stat">{stats.streak}</p>
          <p className='stat-descriptor'>Current streak</p>
        </div>
        <div className='stat-item'>
          <p id='best-streak' className="stat">{stats.bestStreak}</p>
          <p className='stat-descriptor'>Best streak</p>
        </div>
        <div className='stat-item'>
          <p id='best-time' className="stat">{bestMinutes}:{bestSeconds < 10 ? `0${bestSeconds}` : bestSeconds}</p>
          <p className='stat-descriptor'>Fastest find</p>
        </div>
      </div>
    </div>

    const distributionPanel = <div className="stats-page-panel">
      <h1 className='stats-header'>SCORE DISTRIBUTION</h1>
      <div id='distribution-section' >
        <BarChart stats={stats} gameOver={gameOver} minutes={minutes} seconds={seconds} resultsBar={resultsBar}/>
      </div>
    </div>

    if (showStats && gameOver) {
        return (
          <div className='stats-overlay'>
            <Alert id='copy-alert' variant="success" show={showAlert}>
              Results copied to clickboard
            </Alert>
            <div className='stats-div'>
              {statasticsTopBar}
              {statisticsPanel}
              {/* <div className='stats-timer-div'>You found {char.charName} in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div> */}
              {distributionPanel}
              <div id='stats-bottom-div'>
                <div id='stats-next-game'>
                  <h1 id='next-game-text'>Next Searchle</h1>
                  <h1 id='next-game-timer'><Countdown date={tomorrow} daysInHours={true} overtime={true}/></h1>
                </div>
                <div id='stats-share-div'>
                  <button id='stats-share-button' onClick={handleShareClick}>Share</button>
                </div>
              </div>
            </div>
          </div>
        );
      }

    if (showStats) {
        return (
            <div className='stats-overlay'>
              <div className='stats-div'>
                {statasticsTopBar}
                {statisticsPanel}
                {distributionPanel}
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default StatsScreen;