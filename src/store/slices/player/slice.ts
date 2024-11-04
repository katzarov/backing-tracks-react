import { createSlice } from "@reduxjs/toolkit";
import { setTrackPlaylistTuple as setTrackPlaylistTupleAction } from "./actions";
import { resetStoreAction } from "src/store/extraActions";
import { router } from "@src/routes/router";
import { routes } from "@src/routes/routes";
import { playlistsApi } from "@src/store/api/playlists";

export interface PlayerState {
  playerWebComponentInitialLoading: boolean;
  loadingTrack: boolean | null;
  trackId: number | null;
  playlistId: number | null;
}

const initialState: PlayerState = {
  playerWebComponentInitialLoading: true,
  loadingTrack: null,
  trackId: null,
  playlistId: null,
};

export const { reducer: playerReducer, actions: playerActions } = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrackPlaylistTuple: setTrackPlaylistTupleAction,
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

        router.navigate(`${routes.app.root}`, { replace: true });
      }
    );
    builder.addMatcher(resetStoreAction.match, () => {
      return initialState;
    });
  },
});

export const { setTrackPlaylistTuple } = playerActions;
