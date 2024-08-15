import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authClient } from "@lib/auth";

const apiBaseUrl = import.meta.env.VITE_API;

export const baseQuery = fetchBaseQuery({
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
  tagTypes: ["Tracks"],
  endpoints: () => ({}),
});

// here we defined the rest of the api endpoints that we don't want to use RTK Query for.
// https://github.com/reduxjs/redux-toolkit/issues/1522
// https://github.com/reduxjs/redux-toolkit/discussions/3843
export const nonRTKQueryApi = {
  fetchTrackFromNestJSApi: async (uri: string): Promise<Blob | null> => {
    const getTrackFileEndpoint = `${apiBaseUrl}tracks/file/${uri}`;

    const token = await authClient.getTokenSilently();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(getTrackFileEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching the file:", error);
      return null;
    }
  },
  fetchTrackFromS3Bucket: async (
    presignedUrl: string
  ): Promise<Blob | null> => {
    try {
      const response = await fetch(presignedUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching the file:", error);
      return null;
    }
  },
};
