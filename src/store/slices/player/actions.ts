import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "./slice";

export const setTrackPlaylistTuple = (
  state: PlayerState,
  { payload }: PayloadAction<Pick<PlayerState, "trackId" | "playlistId">>
) => {
  state.trackId = payload.trackId;
  state.playlistId = payload.playlistId;
};
