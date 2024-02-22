import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessTokenSilently } from "../main";

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

interface Track {
  resourceId: string;
  name: string;
}

// TODO, setup code split api slices
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllTracks: builder.query<Track[], string>({
      query: () => `tracks`,
    }),
  }),
});

export const { useGetAllTracksQuery } = apiSlice;
