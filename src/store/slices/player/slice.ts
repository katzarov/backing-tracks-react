import { createSlice } from "@reduxjs/toolkit";
import {
  setIsEditingRegions as setIsEditingRegionsAction,
  setIsLooping as setIsLoopingAction,
  setTrackPlaylistTuple as setTrackPlaylistTupleAction,
  setRegionId as setRegionIdAction,
  wavesurferEvent as wavesurferEventAction,
} from "./actions";
import { resetStoreAction } from "src/store/extraActions";
import { playlistsApi } from "@src/store/api/playlists";

export interface PlayerState {
  isWavesurferInitializing: boolean;
  isLoadingTrack: boolean | null;
  isPlaying: boolean;
  isEditingRegions: boolean;
  isLooping: boolean;
  trackId: number | null;
  playlistId: number | null;
  regionId: string | null;
}

const initialState: PlayerState = {
  isWavesurferInitializing: true,
  isLoadingTrack: null,
  isPlaying: false,
  isEditingRegions: false,
  isLooping: false,
  trackId: null,
  playlistId: null,
  regionId: null,
};

export const { reducer: playerReducer, actions: playerActions } = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrackPlaylistTuple: setTrackPlaylistTupleAction,
    setIsEditingRegions: setIsEditingRegionsAction,
    setIsLooping: setIsLoopingAction,
    setRegionId: setRegionIdAction,
    wavesurferEvent: wavesurferEventAction,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      playlistsApi.endpoints.deletePlaylist.matchFulfilled,
      (state, action) => {
        const deletedPlaylistId = action.meta.arg.originalArgs;

        if (state.playlistId === deletedPlaylistId) {
          state.playlistId = null;
          state.trackId = null;
        }
      }
    );
    builder.addMatcher(resetStoreAction.match, () => {
      return initialState;
    });
  },
});

export const {
  setTrackPlaylistTuple,
  wavesurferEvent,
  setIsEditingRegions,
  setIsLooping,
  setRegionId,
} = playerActions;
