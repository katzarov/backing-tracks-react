import { createSlice } from "@reduxjs/toolkit";
import { REMEMBER_REHYDRATED } from "redux-remember";
import { AppState } from "../../store";
import { resetStoreAction } from "../../extraActions";

export interface IApp {
  appRehydrated: boolean;
}

const initialState: IApp = {
  appRehydrated: false,
};

const { reducer: appReducer } = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(REMEMBER_REHYDRATED, (state) => {
      state.appRehydrated = true;
    });
    builder.addMatcher(resetStoreAction.match, (state) => {
      // handles if state is already rehydrated
      return { ...initialState, appRehydrated: state.appRehydrated };
    });
  },
});

export { appReducer };

export const selectAppRehydrated = (state: AppState) => state.app.appRehydrated;
