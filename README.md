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
- users can just paste a YouTube link, and the app will download the track and add it to their library. They can also import tracks via uploads. All tracks are matched to Spotify's track catalogue - this is done manually by the user, at least for now. 2025 update: We can now extract better YT metadata, but even if that is not the case - i am sure we can use some AI (or shazam if it can handle non-exact matches) to figure what the song most likely is. So probably the user will only need to confirm whether the extracted track is what we think it is.
- users can change the tempo and pitch of tracks in a granular way.
- users can select a certain section of a track, and later be able to quickly load it and put it on repeat.
- advanced audio player that also shows the waveform of the track. And interactions with the waveform itself are possible - like skipping to a different part of the song + more.

- 2025 update: we need to get on with the times: AI stem splitters are amazing and in a lot of cases we can create better backing tracks using them. There are opensource projects that solve that issue. would be a cool way to learn some python as well.

## TODOs

[see project TODOs](TODO.md)

## App Stack

- React 18
- Redux Toolkit - Redux, RTK Query, createListenerMiddleware (like Redux Saga but much simpler)
- React Router v6 - For some reason, I have low trust in the long term outlook of this project and its ideas.
- MUI - I came a long way with undoing the materialui-ness out of it and making it look and feel like my own. But long term I am not sure if its the best solution... I will be looking at other solutions, maybe some unstyled comps like radix-ui and then just style with plain css or tailwind. I don't know yet. The pro is that a lot of companies I have been applying to are using it.. Mui also offers other solutions that we can take a look at.
- Formik.. seems dead ? Anyway, I want something that can natively use zod schemas and formik can probably do it but with 3rd party adapters. My idea is that both the client and server can use the same validation schemas.
- Wavesurfer.js
- Vite

## Conventions

As of now, it's a playground for ideas.., the whole project is. So don't take it too seriously.

### Folder Structure

TODO

## Installation

TODO
