import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "./slice";
import { IWavesurferEvents } from "@src/lib/wavesurfer-react";

export const setTrackPlaylistTuple = (
  state: PlayerState,
  { payload }: PayloadAction<Pick<PlayerState, "trackId" | "playlistId">>
) => {
  state.trackId = payload.trackId;
  state.playlistId = payload.playlistId;
};

export const setIsEditingRegions = (
  state: PlayerState,
  { payload }: PayloadAction<boolean>
) => {
  state.isEditingRegions = payload;
};

export const setIsLooping = (
  state: PlayerState,
  { payload }: PayloadAction<boolean>
) => {
  state.isLooping = payload;
};

export const setRegionId = (
  state: PlayerState,
  { payload }: PayloadAction<string | null>
) => {
  state.regionId = payload;
};

export const wavesurferEvent = (
  state: PlayerState,
  { payload }: PayloadAction<IWavesurferEvents>
) => {
  switch (payload) {
    case "load": {
      state.isPlaying = false;
      break;
    }
    case "ready": {
      state.isPlaying = false;
      break;
    }
    case "play": {
      state.isPlaying = true;
      break;
    }
    case "pause": {
      state.isPlaying = false;
      break;
    }
    case "destroy": {
      state.isPlaying = false;
      break;
    }
  }
};
