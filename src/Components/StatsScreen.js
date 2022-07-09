import React from "react";
import { MdClose } from "react-icons/md";
import "../Styles/StatsScreen.css"

const StatsScreen = ({gameOver, showStats, setShowStats, stats}) => {
    const minutes = stats.minutes;
    const seconds = stats.seconds;

    const statisticsPanel = <div id='stats-panel'>
      <h3 id='stats-header'>Statistics</h3>
      <div id='stats-section'>
        <div className='stat-item'></div>
      </div>
    </div>

    const closeStats = () => {
        setShowStats(false);
    }

    if (showStats && gameOver) {
        return (
            <div className='stats-overlay'>
              <div className='stats-div'>
                <div className='stats-close-div'><MdClose className='stats-close' onClick={closeStats}/></div>
                <div className='stats-timer-div'>You won in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                <div className='stats-actual-div'>
                  <p>Statistics</p>
                  <p>Played {stats.played}</p>
                  <p>Wins {stats.wins}</p>
                  <p>Percent won {stats.percent}%</p>
                  <p>Streak {stats.streak}</p>
                  <p>Time Distribution</p>
                </div>
                <div id='stats-bottom-div'>
                  <div id='stats-next-game'>
                    <p>4:23:02 until next character</p>
                  </div>
                  <div id='stats-share'>
                    <button>Share</button>
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
                <div className='stats-close-div'><MdClose className='stats-close' onClick={closeStats}/></div>
                <div className='stats-actual-div'>
                  <p>Statistics</p>
                  <p>Wins {stats.wins}</p>
                  <p>Percent won {stats.percent}%</p>
                  <p>Streak {stats.streak}</p>
                  <p>Time Distribution</p>
                </div>
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default StatsScreen;