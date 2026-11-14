import { existsSync } from 'fs';
import { resolve } from 'path';
import { getDailyGame } from './dailyGame';
import catalog from './puzzleCatalog.json';

test('the puzzle number and countdown roll over together at midnight Eastern', () => {
  const midnight = Date.parse('2026-11-13T00:00:00-05:00');

  expect(getDailyGame(midnight - 1)).toMatchObject({
    current: 1396,
    nextGameAt: midnight,
  });
  expect(getDailyGame(midnight)).toMatchObject({
    current: 1397,
    nextGameAt: Date.parse('2026-11-14T00:00:00-05:00'),
  });
  expect(getDailyGame(Date.parse('2026-11-12T22:00:00-07:00'))).toEqual(getDailyGame(midnight));
});

test('the rollover stays at Eastern midnight across daylight saving changes', () => {
  const summerMidnight = Date.parse('2027-07-01T00:00:00-04:00');
  expect(getDailyGame(summerMidnight - 1).nextGameAt).toBe(summerMidnight);
  expect(getDailyGame(summerMidnight).current).toBe(getDailyGame(summerMidnight - 1).current + 1);

  // Clocks fall back on 2026-11-01 and spring forward on 2027-03-14.
  expect(getDailyGame(Date.parse('2026-11-01T00:30:00-04:00')).nextGameAt)
    .toBe(Date.parse('2026-11-02T00:00:00-05:00'));
  expect(getDailyGame(Date.parse('2027-03-14T00:30:00-05:00')).nextGameAt)
    .toBe(Date.parse('2027-03-15T00:00:00-04:00'));
});

test('the rotation serves every placement with valid assets and changes image every day', () => {
  const start = Date.UTC(2026, 10, 13);
  const placementCount = catalog.reduce((sum, image) => sum + image.characters.length, 0);
  const rotation = Array.from({ length: placementCount + 1 }, (_, day) =>
    getDailyGame(start + day * 24 * 60 * 60 * 1000)
  );

  const uniquePlacements = new Set();
  rotation.slice(0, -1).forEach(({ image, character }, index) => {
    expect(image.imgUrl).not.toBe(rotation[index + 1].image.imgUrl);
    uniquePlacements.add(JSON.stringify([image.imgUrl, character]));
    for (const asset of [image.imgUrl, character.charUrl]) {
      expect(existsSync(resolve(__dirname, '../Assets', '.' + asset))).toBe(true);
    }
    for (const position of [character.xPos, character.yPos]) {
      expect(position).toBeGreaterThanOrEqual(0);
      expect(position).toBeLessThanOrEqual(100);
    }
  });
  expect(uniquePlacements.size).toBe(placementCount);
});
