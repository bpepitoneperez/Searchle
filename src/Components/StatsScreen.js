import React from "react";
import { MdClose } from "react-icons/md";
import "../Styles/StatsScreen.css"

const StatsScreen = ({gameOver, showStats, setShowStats, stats}) => {

    const closeStats = () => {
        setShowStats(false);
    }

    if (showStats && gameOver) {
        return (
            <div className='stats-overlay'>
              <div className='stats-div'>
                <div className='stats-close-div'><MdClose className='stats-close' onClick={closeStats}/></div>
                <div className='stats-timer-div'>Gameover Stats</div>
                <div className='stats-header'>Support today's artist</div>
              </div>
            </div>
          );
      }

    if (showStats) {
        return (
            <div className='stats-overlay'>
              <div className='stats-div'>
                <div className='stats-close-div'><MdClose className='stats-close' onClick={closeStats}/></div>
                <div className='stats-timer-div'>Stats here idk</div>
                <div className='stats-header'>Support today's artist</div>
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default StatsScreen;