export const checkLocalstorage = () =>
{
    const stats = JSON.parse(localStorage.getItem('stats'));
      if (stats && stats !== {}) {
        return stats;
      }
      else
      {
        let defaultStats = {
          played: 0,
          wins: 0,
          percent: 0,
          streak: 0,
          bestStreak: 0,
          minutes: 0,
          seconds: 0,
          bestMinutes: 0,
          bestSeconds: 0,
          lastGamePlayed: 0,
          lastResultsBar: '0',
          times: {
            thirtyOrLess: 0,
            oneOrLess: 0,
            oneThirtyOrLess: 0,
            twoOrLess: 0,
            twoThirtyOrLess: 0,
            threeOrLess: 0
          }
        }
        return defaultStats;
      }
}