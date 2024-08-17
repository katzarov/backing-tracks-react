import { createSlice } from "@reduxjs/toolkit";
import {
  setAuthenticated as setAuthenticatedAction,
  setUserData as setUserDataAction,
} from "./actions";
import { resetStoreActionMatcher } from "src/store/utils";

export interface AuthState {
  isAuthenticated: boolean;
  userData: {
    name: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: {
    name: null,
  },
};

export const { reducer: authReducer, actions: authActions } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: setAuthenticatedAction,
    setUserData: setUserDataAction,
  },
  extraReducers: (builder) => {
    builder.addMatcher(resetStoreActionMatcher, () => {
      return initialState;
    });
  },
});

export const { setAuthenticated, setUserData } = authActions;
