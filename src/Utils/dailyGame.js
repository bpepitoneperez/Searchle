import catalog from './puzzleCatalog.json';

const DAY_MS = 24 * 60 * 60 * 1000;
const lastLegacyGameDate = Date.UTC(2026, 8, 9);
const lastLegacyGameNumber = 1332;

// An entry with only `imgUrl` and `characters` adds placements to an image
// listed earlier, so new characters can go at the end of the catalog without
// shifting the placements that existing eras already serve.
const images = {};
const puzzles = catalog.flatMap(({ characters, ...entry }) => {
  const image = images[entry.imgUrl] || (images[entry.imgUrl] = entry);
  return characters.map(character => ({ image, character }));
});

// New placements are appended to the end of the catalog and switched on by
// adding an era that starts on a future Eastern date, so dates that have
// already been served keep their puzzles. Each era uses the first `size`
// placements. Its step must be coprime with `size` so every placement appears
// once per cycle, and both `step` and `size - step` must be at least the
// largest image's character count so the image changes every day.
const rotationEras = [
  // 43 and 106 are coprime; the largest image then had 41 characters.
  { startsOn: lastLegacyGameDate, size: 106, step: 43 },
  // 43 and 126 are coprime; the largest image has 42 characters and 126 - 43 = 83.
  { startsOn: Date.UTC(2026, 10, 17), size: 126, step: 43 },
  // 43 and 145 are coprime; the largest image has 42 characters and 145 - 43 = 102.
  { startsOn: Date.UTC(2026, 10, 18), size: 145, step: 43 },
  // 43 and 160 are coprime; the largest image has 42 characters and 160 - 43 = 117.
  { startsOn: Date.UTC(2026, 10, 19), size: 160, step: 43 },
  // 173 is prime; the largest image has 42 characters and 173 - 43 = 130.
  { startsOn: Date.UTC(2026, 10, 20), size: 173, step: 43 },
  // 191 is prime; the largest image has 42 characters and 191 - 43 = 148.
  { startsOn: Date.UTC(2026, 10, 21), size: 191, step: 43 },
  // 199 is prime; the largest image has 42 characters and 199 - 43 = 156.
  { startsOn: Date.UTC(2026, 10, 22), size: 199, step: 43 },
  // 43 and 214 are coprime; the largest image has 42 characters and 214 - 43 = 171.
  { startsOn: Date.UTC(2026, 10, 23), size: 214, step: 43 },
  // 43 and 225 are coprime. Cyberpunk City's placements are now split in two
  // blocks, so the daily-image-change test is what confirms this step.
  { startsOn: Date.UTC(2026, 10, 24), size: 225, step: 43 },
].reduce((eras, era) => {
  const previous = eras[eras.length - 1];
  // Pick up where the previous era would have been on this era's first day.
  const firstIndex = previous ? eraIndex(previous, era.startsOn / DAY_MS) : 0;
  return [...eras, { ...era, firstIndex }];
}, []);

function eraIndex({ startsOn, size, step, firstIndex = 0 }, easternDay) {
  const days = easternDay - startsOn / DAY_MS;
  return (((firstIndex + days * step) % size) + size) % size;
}

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
  const era = rotationEras.filter(({ startsOn }) => startsOn / DAY_MS <= easternDay).pop()
    || rotationEras[0];
  const puzzleIndex = eraIndex(era, easternDay);

  return {
    ...puzzles[puzzleIndex],
    current: lastLegacyGameNumber + daysSinceLastLegacyGame,
    nextGameAt,
  };
}
