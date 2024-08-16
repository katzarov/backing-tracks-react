import { AppState } from "../../";

export const selectIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated;

export const selectUserData = (state: AppState) => state.auth.userData;
