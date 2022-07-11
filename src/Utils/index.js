export const getResultsText = (minutes, seconds, shareText) => {
    let minutesText = minutes < 10 ? `0${minutes}` : minutes;
    let secondsText = seconds < 10 ? `0${seconds}` : seconds;
    let tempText = shareText;
    let tempBar = '0'

    tempText += ` - ${minutesText}:${secondsText}\n`;
    
    let thirtyOrLess = {
      text: '🔍 🟩 ⬛ ⬛ ⬛ ⬛ ⬛',
      bar: '0:30'
    }
    let oneOrLess = {
      text: '🔍 🟥  🟩 ⬛ ⬛ ⬛ ⬛',
      bar: '1:00'
    }
    let oneThirtyOrLess = {
      text: '🔍 🟥  🟥  🟩 ⬛ ⬛ ⬛',
      bar: '1:30'
    }
    let twoOrLess = {
      text: '🔍 🟥  🟥  🟥  🟩 ⬛ ⬛',
      bar: '2:00'
    }
    let twoThirtyOrLess = {
      text: '🔍 🟥  🟥  🟥  🟥  🟩 ⬛',
      bar: '2:30'
    }
    let threeOrLess = {
      text: '🔍 🟥  🟥  🟥  🟥  🟥  🟩',
      bar: '3:00'
    }
    let overThree = {
      text: '🔍 🟥  🟥  🟥  🟥  🟥  🟥',
      bar: '0'
    }
    
    if (minutes === 0)
    {
      if (seconds <= 30)
      {
        tempText += thirtyOrLess.text;
        tempBar = thirtyOrLess.bar;
      }
      else
      {
        tempText += oneOrLess.text;
        tempBar += oneOrLess.bar;
      }
    }
    else if (minutes === 1)
    {
      if (seconds === 0)
      {
        tempText += oneOrLess.text;
        tempBar += oneOrLess.bar;
      }
      else if (seconds <= 30)
      {
        tempText += oneThirtyOrLess.text;
        tempBar = oneThirtyOrLess.bar;
      }
      else
      {
        tempText += twoOrLess.text;
        tempBar += twoOrLess.bar;
      }
    }
    else if (minutes === 2)
    {
      if (seconds === 0)
      {
        tempText += twoOrLess.text;
        tempBar += twoOrLess.bar;
      }
      else if (seconds <= 30)
      {
        tempText += twoThirtyOrLess.text;
        tempBar = twoThirtyOrLess.bar;
      }
      else
      {
        tempText += threeOrLess.text;
        tempBar += threeOrLess.bar;
      }
    }
    else if (minutes === 3)
    {
      if (seconds === 0)
      {
        tempText += threeOrLess.text;
        tempBar += threeOrLess.bar;
      }
      else
      {
        tempText += overThree.text;
        tempBar += overThree.bar;
      }
    }
    else
    {
      tempText += overThree.text;
      tempBar += overThree.bar;
    }

    return [tempText, tempBar];
  }