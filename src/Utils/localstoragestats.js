export const checkLocalstorage = () =>
{
    const stats = JSON.parse(localStorage.getItem('stats'));
      if (stats && !stats.beta) {
        return stats;
      }
      else
      {
        let defaultStats = {
          beta: false,
          played: 0,
          wins: 0,
          percent: 0,
          streak: 0,
          bestStreak: 0,
          bestMinutes: 0,
          bestSeconds: 0,
          lastGamePlayed: 0,
          lastShareText: "Searchle Share",
          lastResultsBar: '0',
          times: {
            tenSecondsOrLess: 0,
            twentySecondsOrLess: 0,
            thirtySecondsOrLess: 0,
            oneMinuteOrLess: 0,
            oneMinuteThirtySecondsOrLess: 0,
            twoMinutesOrLess: 0
          }
        }
        return defaultStats;
      }
}