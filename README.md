# Searchle React Frontend

## About

Originally part of the coursework for The Odin Project to make a Where's Waldo website to learn Firebase and practice React, I thought making it a Wordle clone would be more interesting and fun.

The daily rotation contains 250 character placements across 14 images.

## Frontend

This frontend is built with React (bootstrapped with Create-React-App) and React-Router, with some react-bootstrap and other css for styling.

## Daily puzzles

The browser selects the day's image and character from `src/Utils/puzzleCatalog.json`. The puzzle and countdown advance at midnight Eastern Time (America/New_York), including in an open tab. Puzzle numbering continues from the last puzzle recorded by the old API. Player stats stay in local storage.

The catalog order and rotation step determine which puzzle appears on each date. To expand the catalog, introduce the new rotation from a fixed future Eastern date so previously published dates keep their assigned puzzles. Always append to the end of the catalog. To add characters to an image that is already listed, append an entry with only its `imgUrl` and the new `characters`; it reuses that image's title and credit.

## Run and deploy

Run `npm ci` and `npm start` for local development. Run `npm run deploy` to build and publish to the existing `gh-pages` branch for Searchle.dev. The site needs only static hosting.
