import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authClient } from "@lib/auth";

const apiBaseUrl = import.meta.env.VITE_API;

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  // prepareHeaders: (headers, { getState }) => {, can also get the state here, probaby will need to later.
  prepareHeaders: async (headers) => {
    // TODO this throws, handle error => need to redirect to login page and show some error msg
    const token = await authClient.getTokenSilently();

    // TODO: dont save tokens to local storage but as HttpOnly secure cookie, then include credentials: true in fetch and the browser will auto include the cookie with de token
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#block_access_to_your_cookies
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
  // credentials: "include", TODO handle cookies in nest https://docs.nestjs.com/techniques/cookies
});

const tagTypes = [
  "Track",
  "PlaylistsOfTrack",
  "Playlist",
  "TracksOfPlaylist",
] as const;

export type ITagTypes = (typeof tagTypes)[number];

// https://github.com/reduxjs/redux-toolkit/blob/master/examples/query/react/kitchen-sink/src/app/services/posts.ts
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes,
  endpoints: () => ({}),
});

// special rtkq tag entity id, that must not collide with any (primary column) id in the database.
// Added to (all) lists (getAll/findAll endpoints), which is currently what is recommended by the RTK team for the following scenario:
// In general, when we want to create/add an item/entity via some of our endpoints, we want to invalidate the cache of endpoints that are getting a list of the same entities.
// So that the fetch is re-triggered and we get the whole list again - this time with the newly created item/enitity as well.
// https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#advanced-invalidation-with-abstract-tag-ids
export const listId = "LIST";
