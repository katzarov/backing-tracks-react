import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authClient } from "@lib/auth";

const apiBaseUrl = import.meta.env.VITE_API;

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  // prepareHeaders: (headers, { getState }) => {, can also get the state here, probaby will need to later.
  prepareHeaders: async (headers) => {
    const token = await authClient.getTokenSilently();
    // TODO if cannot login here, dispatch logout action and redirect to login page
    // TODO: dont save tokens to local storage but as HttpOnly secure cookie, then include credentials: true in fetch and the browser will auto include the cookie with de token
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#block_access_to_your_cookies
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
  // credentials: "include", TODO handle cookies in nest https://docs.nestjs.com/techniques/cookies
});

// https://github.com/reduxjs/redux-toolkit/blob/master/examples/query/react/kitchen-sink/src/app/services/posts.ts
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Tracks", "Playlists"],
  endpoints: () => ({}),
});
