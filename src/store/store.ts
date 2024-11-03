import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api/rtk-query-api-config";
import { authReducer } from "./slices/auth";
import { playerReducer } from "./slices/player";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import { reduxRememberConfig } from "./middleware/redux-remember.config";
import { ListenerMiddlewareWithAppTypes } from "./middleware/createListenerMiddleware.config";
import { appReducer } from "./slices/app/slice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appReducer,
  auth: authReducer,
  player: playerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const persistedReducer = rememberReducer(rootReducer);

// used to create the same store configuration when testing
export const createStore = (state?: Partial<AppState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .prepend(ListenerMiddlewareWithAppTypes.listenerMiddleware.middleware)
        .concat(api.middleware);
    },
    enhancers: (getDefaultEnhancers) => {
      return getDefaultEnhancers().concat(
        rememberEnhancer(
          reduxRememberConfig.driver,
          reduxRememberConfig.persistedKeys,
          reduxRememberConfig.options
        )
      );
    },
    preloadedState: state,
  });
};

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
