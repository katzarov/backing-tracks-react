import { createAction } from "@reduxjs/toolkit";

export const resetStoreAction = createAction("@@RESET_STORE");

const userEventPrefix = "@@USER_EVENT/";

export const userEventClickTrack = createAction<number>(
  `${userEventPrefix}clickTrack`
);
