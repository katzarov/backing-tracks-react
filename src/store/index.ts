import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterReducer from "./counterSlice";
import { api } from "./api/api";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  counter: counterReducer,
});

// TODO: might want to persist a slice or two.

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// TODO maybe have this (just for prod)
// refetchOnFocus/refetchOnReconnect
// setupListeners(store.dispatch)
