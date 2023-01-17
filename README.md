# Searchle React Frontend

Play here: https://bpepitoneperez.github.io/Searchle/

Basically a Wordle x Where's Waldo fusion

## About

Originally part of the coursework for The Odin Project to make a Where's Waldo website to learn Firebase and practice React, I thought making it a Wordle clone would be more interesting and fun.

Currently there are 7 images and 108 total characters in those images, with plans to add more in the future.

## Frontend

This frontend is built with React (bootstrapped with Create-React-App) and React-Router, with some react-bootstrap and other css for styling.

## Backend

The frontend pulls the image for the day (currently updating every hour for testing/beta) from a Node.js api backend, which is connected to a MongoDB

## PROJECT TODO

Stats next game timer

Actually fix the stats

Adjust font size on zoom

Make api not callable from anywhere but searchle front end

Rewrite game creation logic to create the next X number of days instead of creating a new game every day

Rewrite api logic to ask for the current day from the client
