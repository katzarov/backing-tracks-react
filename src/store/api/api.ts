import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessTokenSilently } from "../../main";

const apiBaseUrl = import.meta.env.VITE_API;

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  // prepareHeaders: (headers, { getState }) => {, can also get the state here, probaby will need to later.
  prepareHeaders: async (headers) => {
    const token = await getAccessTokenSilently();
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// https://github.com/reduxjs/redux-toolkit/blob/master/examples/query/react/kitchen-sink/src/app/services/posts.ts
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Tracks"],
  endpoints: () => ({}),
});
