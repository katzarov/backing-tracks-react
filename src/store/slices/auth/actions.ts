import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./slice";

export const setAuthenticated = (
  state: AuthState,
  { payload }: PayloadAction<boolean>
) => {
  state.isAuthenticated = payload;
};

export const setUserData = (
  state: AuthState,
  { payload }: PayloadAction<Pick<AuthState, "userData">>
) => {
  state.userData = payload.userData;
};
