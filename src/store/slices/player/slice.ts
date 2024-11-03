import { createSlice } from "@reduxjs/toolkit";
import { setTrackPlaylistTuple as setTrackPlaylistTupleAction } from "./actions";
import { resetStoreAction } from "src/store/extraActions";
import { router } from "@src/routes/router";
import { routes } from "@src/routes/routes";
import { playlistsApi } from "@src/store/api/playlists";
import { LocalStorage } from "@src/lib/browser-storage";

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
    builder.addMatcher(
      playlistsApi.endpoints.deletePlaylist.matchFulfilled,
      (state, action) => {
        const deletedPlaylistId = action.meta.arg.originalArgs;

        if (state.playlistId === deletedPlaylistId) {
          state.playlistId = null;
          state.trackId = null;

          // TODO lets add redux persist altho it seems abandoned.
          // Also need some middleware for syncing between tabs
          // ... last played track should be persisted on server for best user exp imo.
          LocalStorage.write("trackId", null);
          LocalStorage.write("playlistId", null);
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
