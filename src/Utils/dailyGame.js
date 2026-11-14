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

const easternClock = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hourCycle: 'h23',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

// Milliseconds to add to a UTC timestamp to get Eastern wall-clock time (negative).
function easternOffset(timestamp) {
  const parts = {};
  for (const { type, value } of easternClock.formatToParts(timestamp)) {
    parts[type] = Number(value);
  }
  const wallClock = Date.UTC(
    parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second
  );
  return wallClock - Math.floor(timestamp / 1000) * 1000;
}

export function getDailyGame(now = Date.now()) {
  const offset = easternOffset(now);
  const easternDay = Math.floor((now + offset) / DAY_MS);
  const daysSinceLastLegacyGame = easternDay - lastLegacyGameDate / DAY_MS;
  // The offset can change before the next midnight on daylight saving days,
  // so read it again close to the rollover.
  const nextMidnight = (easternDay + 1) * DAY_MS;
  const nextGameAt = nextMidnight - easternOffset(nextMidnight - offset);
  const rotationOffset = (daysSinceLastLegacyGame * rotationStep) % puzzles.length;
  const puzzleIndex = (rotationOffset + puzzles.length) % puzzles.length;

  return {
    ...puzzles[puzzleIndex],
    current: lastLegacyGameNumber + daysSinceLastLegacyGame,
    nextGameAt,
  };
}
