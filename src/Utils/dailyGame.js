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
// placements. A `step` era must use a step coprime with `size` so every
// placement appears once per cycle; a `spread` era (the default for new eras)
// serves an evenly spaced order instead. Either way, the daily-image-change
// test confirms the image never repeats on consecutive days.
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
  // 43 and 232 are coprime; the daily-image-change test confirms the step.
  { startsOn: Date.UTC(2026, 10, 25), size: 232, step: 43 },
  // 239 is prime; the daily-image-change test confirms the step.
  { startsOn: Date.UTC(2026, 10, 26), size: 239, step: 43 },
  // 243 = 3^5. Step 43 repeated an image on consecutive days at this size;
  // 46 is coprime with 243 and passes the daily-image-change test.
  { startsOn: Date.UTC(2026, 10, 27), size: 243, step: 46 },
  // 53 is the smallest step coprime with 250 that never repeats an image on
  // consecutive days at this size.
  { startsOn: Date.UTC(2026, 10, 28), size: 250, step: 53 },
  // 83 is the smallest step coprime with 268 that never repeats an image on
  // consecutive days at this size.
  { startsOn: Date.UTC(2026, 10, 29), size: 268, step: 83 },
  // Once images were split across several catalog blocks, no step avoided
  // repeating an image on consecutive days. `spread` eras instead serve a
  // fixed order that spaces each image's placements evenly across the cycle.
  { startsOn: Date.UTC(2026, 10, 30), size: 293, spread: true },
].reduce((eras, era) => {
  const previous = eras[eras.length - 1];
  const startDay = era.startsOn / DAY_MS;
  if (era.spread) {
    const order = spreadOrder(era.size);
    // Start on the first placement whose image differs from the day before.
    const yesterday = previous && puzzles[eraIndex(previous, startDay - 1)].image;
    const firstIndex = Math.max(0, order.findIndex(i => puzzles[i].image !== yesterday));
    return [...eras, { ...era, order, firstIndex }];
  }
  // Pick up where the previous era would have been on this era's first day.
  const firstIndex = previous ? eraIndex(previous, startDay) : 0;
  return [...eras, { ...era, firstIndex }];
}, []);

// Orders the first `size` placements so each image's placements are spaced
// evenly: the k-th of an image's n placements sits at (k + 0.5) / n of the cycle.
function spreadOrder(size) {
  const seen = new Map();
  const counts = new Map();
  puzzles.slice(0, size).forEach(({ image }) => counts.set(image, (counts.get(image) || 0) + 1));
  const order = puzzles.slice(0, size)
    .map(({ image }, index) => {
      const k = seen.get(image) || 0;
      seen.set(image, k + 1);
      return { index, at: (k + 0.5) / counts.get(image) };
    })
    .sort((a, b) => a.at - b.at || a.index - b.index)
    .map(({ index }) => index);
  // Even spacing can still put two of the same image side by side where their
  // positions tie, so pull the next different image forward (wrapping around).
  const imageAt = i => puzzles[order[(i + size) % size]].image;
  for (let i = 0; i < size; i++) {
    if (imageAt(i) !== imageAt(i - 1)) continue;
    for (let j = i + 1; j < i + size; j++) {
      if (imageAt(j) !== imageAt(i - 1) && imageAt(j - 1) !== imageAt(i) && imageAt(j + 1) !== imageAt(i)) {
        const a = i % size, b = j % size;
        [order[a], order[b]] = [order[b], order[a]];
        break;
      }
    }
  }
  return order;
}

function eraIndex({ startsOn, size, step, order, firstIndex = 0 }, easternDay) {
  const days = easternDay - startsOn / DAY_MS;
  if (order) return order[(((firstIndex + days) % size) + size) % size];
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
