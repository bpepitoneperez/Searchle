export const getNewStats = (game, minutes, seconds, shareText, stats) => {
    let minutesText = minutes < 10 ? `0${minutes}` : minutes;
    let secondsText = seconds < 10 ? `0${seconds}` : seconds;
    let tempText = shareText;
    let tempBar = '0'
    let tempStats = stats;
    let newTimes = stats.times;
    let newPlayed = stats.played + 1;
    let newWins = stats.wins;

    tempText += ` #${game} - ${minutesText}:${secondsText}\n`;
    
    let tenSecondsOrLess = {
      text: '🔍 🟩 ⬛ ⬛ ⬛ ⬛ ⬛',
      bar: '0:10'
    }
    let twentySecondsOrLess = {
      text: '🔍 🟥  🟩 ⬛ ⬛ ⬛ ⬛',
      bar: '0:20'
    }
    let thirtySecondsOrLess = {
      text: '🔍 🟥  🟥  🟩 ⬛ ⬛ ⬛',
      bar: '0:30'
    }
    let oneMinuteOrLess = {
      text: '🔍 🟥  🟥  🟥  🟩 ⬛ ⬛',
      bar: '1:00'
    }
    let oneMinuteThirtySecondsOrLess = {
      text: '🔍 🟥  🟥  🟥  🟥  🟩 ⬛',
      bar: '1:30'
    }
    let twoMinutesOrLess = {
      text: '🔍 🟥  🟥  🟥  🟥  🟥  🟩',
      bar: '2:00'
    }
    let overTwoMinutes = {
      text: '🔍 🟥  🟥  🟥  🟥  🟥  🟥',
      bar: '0'
    }
    
    if (minutes === 0)
    {
      if (seconds <= 10)
      {
        tempText += tenSecondsOrLess.text;
        tempBar = tenSecondsOrLess.bar;
        newTimes.tenSecondsOrLess += 1;
      }
      else if (seconds <= 20)
      {
        tempText += twentySecondsOrLess.text;
        tempBar = twentySecondsOrLess.bar;
        newTimes.twentySecondsOrLess += 1;
      }
      else if (seconds <= 30)
      {
        tempText += thirtySecondsOrLess.text;
        tempBar = thirtySecondsOrLess.bar;
        newTimes.thirtySecondsOrLess += 1;
      }
      else
      {
        tempText += oneMinuteOrLess.text;
        tempBar = oneMinuteOrLess.bar;
        newTimes.oneMinuteOrLess += 1;
      }
      newWins += 1;
    }
    else if (minutes === 1)
    {
      if (seconds === 0)
      {
        tempText += oneMinuteOrLess.text;
        tempBar = oneMinuteOrLess.bar;
        newTimes.oneMinuteOrLess += 1;
      }
      else if (seconds <= 30)
      {
        tempText += oneMinuteThirtySecondsOrLess.text;
        tempBar = oneMinuteThirtySecondsOrLess.bar;
        newTimes.oneMinuteThirtySecondsOrLess += 1;
      }
      else
      {
        tempText += twoMinutesOrLess.text;
        tempBar = twoMinutesOrLess.bar;
        newTimes.twoMinutesOrLess += 1;
      }

      newWins += 1;
    }
    else if (minutes === 2)
    {
      if (seconds === 0)
      {
        tempText += twoMinutesOrLess.text;
        tempBar = twoMinutesOrLess.bar;
        newTimes.twoMinutesOrLess += 1;
        newWins += 1;
      }
      else
      {
        tempText += overTwoMinutes.text;
        tempBar = overTwoMinutes.bar;
      }
    }
    else
    {
      tempText += overTwoMinutes.text;
      tempBar = overTwoMinutes.bar;
    }
    
    tempText += "\nhttps://bpepitoneperez.com/Searchle/"

    let percentNum = Math.floor((newWins / newPlayed) * 100);
    let percent = `${percentNum}%`

    let newStreak = 0
    
    if (newWins > stats.wins && stats.lastGamePlayed === game - 1)
    {
      newStreak = stats.streak + 1
    }
    else if(newWins > stats.wins)
    {
      newStreak = 1
    }

    tempStats = {
      played: newPlayed,
      wins: newWins,
      percent: percent,
      streak: newStreak,
      bestStreak: newStreak > stats.streak ? newStreak : stats.streak,
      bestMinutes: minutes < stats.bestMinutes || newPlayed === 1 ? minutes : stats.bestMinutes,
      bestSeconds: seconds < stats.bestSeconds || newPlayed === 1 ? seconds : stats.bestSeconds,
      lastGamePlayed: game,
      lastResultsBar: tempBar,
      lastShareText: tempText,
      times: newTimes
    }

    return [tempText, tempBar, tempStats];
  }