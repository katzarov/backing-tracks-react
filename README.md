# Backing Tracks React

## Project Description

### What problem does this solve ?

- I am a guitar player, and usually when I play, I play on top of backing tracks. And what is a backing track ? A guitar backing track is the original song minus the original guitar part.
- Most of my backing tracks, I find on YouTube, but sometimes, they are taken down and thus no longer available.
- Also, If I want to practice just the solo of a certain song, everytime I play I would need to skip to that part of the song, take the solo, then skip back and repeat the process.
- Sometimes I want to slow down the song a bit because maybe its original tempo is too fast, but YouTube's speed controls are not granular enough.

All of this can be easily solved.

### Solution

One possible solution to the above-mentioned problems is a web app that can offer said functionality:

- first, imagine a Spotify clone, where users can create/view playlists, play songs, there is nice art to look at, etc. And to that we add the following major functionalities:
- users can just paste a YouTube link, and the app will download the track and add it to their library. They can also import tracks via uploads. All tracks are matched to Spotify's track catalogue - this is done manually by the user, at least for now.
- users can change the tempo and pitch of tracks in a granular way.
- users can select a certain section of a track, and later be able to quickly load it and put it on repeat.
- advanced audio player that also shows the waveform of the track. And interactions with the waveform itself are possible - like skipping to a different part of the song + more.

## TODOs

[see project TODOs](TODO.md)

## App Stack

- React 18
- React Router v6
- Redux Toolkit - we also use RTK Query (which is part of the package) for data fetching and caching.
- MUI
- Wavesurfer.js
- Vite

## Folder Structure

TODO

## Installation

TODO
