import catalog from './puzzleCatalog.json';

const DAY_MS = 24 * 60 * 60 * 1000;
const lastLegacyGameDate = Date.UTC(2026, 8, 9);
const lastLegacyGameNumber = 1332;

const puzzles = catalog.flatMap(({ characters, ...image }) =>
  characters.map(character => ({ image, character }))
);

// 43 and 106 are coprime, so every pair appears once before the rotation repeats.
// Both a forward and a wraparound step clear the largest group of 41 characters.
const rotationStep = 43;

export function getDailyGame(now = Date.now()) {
  const utcDay = Math.floor(now / DAY_MS);
  const daysSinceLastLegacyGame = utcDay - lastLegacyGameDate / DAY_MS;
  const rotationOffset = (daysSinceLastLegacyGame * rotationStep) % puzzles.length;
  const puzzleIndex = (rotationOffset + puzzles.length) % puzzles.length;

  return {
    ...puzzles[puzzleIndex],
    current: lastLegacyGameNumber + daysSinceLastLegacyGame,
    nextGameAt: (utcDay + 1) * DAY_MS,
  };
}
