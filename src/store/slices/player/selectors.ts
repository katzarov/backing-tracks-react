import { AppState } from "../../";

export const selectTrackId = (state: AppState) => state.player.trackId;
export const selectPlaylistId = (state: AppState) => state.player.playlistId;
export const selectTrackUri = (state: AppState) => state.player.trackUri;
