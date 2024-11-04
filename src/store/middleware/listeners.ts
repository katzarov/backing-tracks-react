import { routerUtils } from "src/lib/router";
import { ListenerMiddlewareWithAppTypes } from "./createListenerMiddleware.config";
import { setTrackPlaylistTuple } from "../slices/player";
import { playlistsApi } from "../api/playlists";
import { isAnyOf } from "@reduxjs/toolkit";
import { PlaylistPlayerState } from "./listeners.helpers";

// we keep the subscription for the current playlist being played
// todo have this as a class where setting the ref automatically resets prev sub so we never forget to do it.
const playlistBeingPlayed: {
  id: number | null;
  ref: {
    unsubscribe: () => void;
  } | null;
} = {
  id: null,
  ref: null,
};

/**
 *
 *  Executed once on app startup after the store is rehydrated and user authenticated.
 *  TODO: need to handle:
 * - what if ids from route(or local storage) are gibberish and we cant load track with them - we need to do cleanup on the URL (and local storage)
 * - if ids are valid but cant find track, should be the same as above, and we need cleanup again and some notification that reousrce does not exist
 *
 */
ListenerMiddlewareWithAppTypes.startListening({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  predicate(action, currentState, originalState) {
    return currentState.app.appRehydrated && currentState.auth.isAuthenticated;
  },
  effect: async (action, listenerApi) => {
    listenerApi.unsubscribe();

    // in future, this can just be a query to some new endpoint that will give the last saved user state, instead of this locally persisted data
    const { trackId: persistedTrackId, playlistId: persistedPlaylistId } =
      listenerApi.getState().player;

    const { trackId: routeTrackId, playlistId: routePlaylistId } =
      routerUtils.getParams();

    // trackId and playlistId from browser url take precedence
    const trackId = routeTrackId !== null ? routeTrackId : persistedTrackId;
    const playlistId =
      routeTrackId !== null ? routePlaylistId : persistedPlaylistId;

    if (trackId === null) {
      // no trackId in url, nor in persisted state => nothing to do here
      return;
    }

    // technically we could be overriding some persisted id with one from route, but as of now, we still dont have any subs so we dont cause any extra react rerenders.
    // aslo in the case, where we keep the persisted state, here we are setting the tuple again to what it already is anyway..
    listenerApi.dispatch(setTrackPlaylistTuple({ trackId, playlistId }));

    if (playlistId === null) {
      // we are in the case where we want to play a track from the all-tracks "playlist",
      // in this case we don't have any playlist functionality like autoplay, shuffle, prev/next track,
      // so logic is not complex, the React component will directly query the individual track and thats it, i.e the react comp will keep the subscription
      return;
    }
    // TODO, I think we can also let the react component - PlayerContainer do the query and keep the sub instead of doing all this here...

    playlistBeingPlayed.id = playlistId;

    const promise = listenerApi.dispatch(
      playlistsApi.endpoints.getTracksOfPlaylist.initiate(playlistId) //initiate(playlistId, {subscriptionOptions: {}})
    );

    const { data, isSuccess, isError } = await promise;

    // if(isError) do somehting todo

    playlistBeingPlayed.ref = promise;
  },
});
