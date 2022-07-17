export const checkLocalstorage = () =>
{
    const stats = JSON.parse(localStorage.getItem('stats'));
      if (stats) {
        return stats;
      }
      else
      {
        let defaultStats = {
          beta: true,
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