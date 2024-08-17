import { Action } from "@reduxjs/toolkit";

const RESET_STORE_ACTION_TYPE = "RESET_STORE";

export const resetStoreAction = (): Action => {
  return {
    type: RESET_STORE_ACTION_TYPE,
  };
};

export const resetStoreActionMatcher = (action: Action) => {
  return action.type === RESET_STORE_ACTION_TYPE;
};
