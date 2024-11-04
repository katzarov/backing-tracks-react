import { createAction } from "@reduxjs/toolkit";

export const resetStoreAction = createAction("@@RESET_STORE");

const userEventPrefix = "@@USER_EVENT/";

export const userEventClickTrack = createAction<number>(
  `${userEventPrefix}clickTrack`
);

export const userEventClickPreviousTrack = createAction(
  `${userEventPrefix}previousTrack`
);

export const userEventClickNextTrack = createAction(
  `${userEventPrefix}nextTrack`
);

export const previousTrackAction = createAction("player/previousTrack");

export const nextTrackAction = createAction("player/nextTrack");
