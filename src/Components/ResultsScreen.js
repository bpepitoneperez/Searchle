import React from "react";
import { MdClose } from "react-icons/md";
import "../Styles/ResultsScreen.css"

const ResultsScreen = ({showResults, setShowResults, results}) => {
    let minutes = results.minutes;
    let seconds = results.seconds;
    let misses = results.misses;

    const closeResults = () => {
      setShowResults(false);
    }

    if (showResults) {
        return (
            <div className='results-overlay'>
              <div className='results-div'>
                <div className='results-close-div'><MdClose className='results-close' onClick={closeResults}/></div>
                <div className='results-timer-div'>You won in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds} with {misses} misses.</div>
                <div className='results-header'>Share button here</div>
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default ResultsScreen;