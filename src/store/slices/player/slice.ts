import { createSlice } from "@reduxjs/toolkit";
import { setTrackPlaylistTuple as setTrackPlaylistTupleAction } from "./actions";
import { resetStoreActionMatcher } from "src/store/utils";

export interface PlayerState {
  playerWebComponentInitialLoading: boolean;
  loadingTrack: boolean | null;
  trackId: number | null;
  playlistId: number | null;
  trackUri: string | null;
}

const initialState: PlayerState = {
  playerWebComponentInitialLoading: true,
  loadingTrack: null,
  trackId: null,
  playlistId: null,
  trackUri: null,
};

export const { reducer: playerReducer, actions: playerActions } = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrackPlaylistTuple: setTrackPlaylistTupleAction,
  },
  extraReducers: (builder) => {
    builder.addMatcher(resetStoreActionMatcher, () => {
      return initialState;
    });
  },
});

export const { setTrackPlaylistTuple } = playerActions;
