import React from "react";
import "./ResultsScreen.css"

const ResultsScreen = ({gameOver, results}) => {
    if (gameOver) {
        return (
            <div className='results-overlay'>
              <div className='results-div'>
                You win or whatever nice
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default ResultsScreen;