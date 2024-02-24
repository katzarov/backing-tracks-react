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

// https://github.com/reduxjs/redux-toolkit/blob/master/examples/query/react/kitchen-sink/src/app/services/posts.ts

type IYouTubeVideoInfoRequest = string;

export interface IYouTubeVideoInfoResponse {
  title: string;
  channel: string;
  length: number;
  thumbnailUrl: string;
}

interface IYouTubeVideoDownloadRequest {
  url: string;
  name: string;
}

type IYouTubeVideoDownloadResponse = string;

interface ITrackResponse {
  resourceId: string;
  name: string;
}

// TODO, setup code split api slices
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Tracks"],
  endpoints: (builder) => ({
    getYouTubeVideoInfo: builder.query<
      IYouTubeVideoInfoResponse,
      IYouTubeVideoInfoRequest
    >({
      query: (videoUrl) => ({
        url: `acquire-tracks/youtube/info/${encodeURIComponent(videoUrl)}`,
      }),
    }),
    addYouTubeVideo: builder.mutation<
      IYouTubeVideoDownloadResponse,
      IYouTubeVideoDownloadRequest
    >({
      query: (body) => ({
        url: "acquire-tracks/youtube/download",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tracks"],
    }),

    getAllTracks: builder.query<ITrackResponse[], void>({
      query: () => ({ url: "tracks" }),
      providesTags: (result = []) => [
        ...result.map(
          ({ resourceId }) => ({ type: "Tracks", resourceId } as const)
        ),
        { type: "Tracks" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTracksQuery,
  useLazyGetYouTubeVideoInfoQuery,
  useAddYouTubeVideoMutation,
} = apiSlice;
