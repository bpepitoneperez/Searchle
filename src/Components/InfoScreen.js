import React from "react";
import { MdClose } from "react-icons/md";
import "../Styles/InfoScreen.css"

const InfoScreen = ({showInfo, setShowInfo, char, firstVisit, setFirstVisit, gameOver, image}) => {

    const closeInfo = () => {
        setShowInfo(false);
        setFirstVisit(false);
    }

    let contextText = 'is'
    if (gameOver)
        contextText = 'was'

    if (showInfo) {
        if (firstVisit)
        {
            return (
                <div id='info-overlay-first'>
                    <div id='info-div-first'>
                        <div id='info-top' className="info-item">
                            <div id='info-top-left' className="info-top-div"></div>
                            <div id='info-top-middle' className="info-top-div">How to play</div>
                            <div id='info-top-right' className="info-top-div"><MdClose id='info-close' onClick={closeInfo}/></div>
                        </div>
                        <div id='info-game-info' className="info-item">
                            <p>Search for today's hidden character in the image</p>
                            <p>Your score is based on how long it takes you</p>
                            <p>The timer starts once this info screen is closed</p>
                        </div>
                        <div id='info-char-details' className="info-item">
                            <div id='info-char-text'>
                                <p>Today's character is <strong>{char.name}</strong> from <strong>{char.source}</strong></p>
                            </div>
                            <img id='char-img' src={char.charUrl} onClick={closeInfo} alt={char.name} />
                        </div>
                        <button id='info-go' className="info-item" onClick={closeInfo}>Start</button>
                    </div>
                </div>
            );
        }
        else
        {
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
                            <p>Search for today's hidden character in the image</p>
                            <p>Your score is based on how long it takes you</p>
                        </div>
                        <div id='info-char-details' className="info-item">
                            <div id='info-char-text'>
                                <p>Today's character {contextText} <strong>{char.name}</strong> from <strong>{char.source}</strong></p>
                            </div>
                            <img id='char-img' src={char.charUrl} onClick={closeInfo} alt="Where's Waldo1" />
                        </div>
                        <a id='info-artist' className="info-item" href={image.authorUrl} target="_blank" rel="noreferrer">
                            Support today's artist
                        </a>
                        <div id='info-blurb' className="info-item">New Searchle everyday! (actually every 30 minutes for testing)</div>
                    </div>
                </div>
            );
        }
      }
    
    return <></>;
};

export default InfoScreen;