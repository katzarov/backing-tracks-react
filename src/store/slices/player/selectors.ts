import { AppState } from "../../";

export const selectTrackId = (state: AppState) => state.player.trackId;
export const selectPlaylistId = (state: AppState) => state.player.playlistId;
export const selectRegionId = (state: AppState) => state.player.regionId;
export const selectIsPlaying = (state: AppState) => state.player.isPlaying;
export const selectIsEditingRegions = (state: AppState) =>
  state.player.isEditingRegions;
export const selectIsLooping = (state: AppState) => state.player.isLooping;
