import React from "react";
import { MdClose } from "react-icons/md";
import "../Styles/InfoScreen.css"

const InfoScreen = ({showInfo, setShowInfo, char}) => {

    const closeInfo = () => {
        setShowInfo(false);
    }

    if (showInfo) {
        return (
            <div id='info-overlay'>
              <div id='info-div'>
                <div id='info-top' className="info-item">
                    <div id='info-top-left' className="info-top-div"></div>
                    <div id='info-top-middle' className="info-top-div">How to play</div>
                    <div id='info-top-right' className="info-top-div"><MdClose id='info-close' onClick={closeInfo}/></div>
                </div>
                {/* <div id='info-close-div' className="info-item"></div> */}
                <div id='info-game-info' className="info-item">
                    <p>Search for the hidden character in the image</p>
                    <p>Your score is based on how long it takes you</p>
                </div>
                <div id='info-char-details' className="info-item">
                    <div id='info-char-text'>
                        <p>Today's character is <strong>{char.charName}</strong> from <strong>{char.source}</strong></p>
                    </div>
                    <img id='char-img' src={char.imgUrl} onClick={closeInfo} alt="Where's Waldo1" />
                </div>
                <div id='info-blurb' className="info-item">New Searchle everyday!</div>
              </div>
            </div>
          );
      }
    
    return <></>;
};

export default InfoScreen;