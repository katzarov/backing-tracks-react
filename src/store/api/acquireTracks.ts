import {
  TrackInstrument,
  TrackType,
} from "../../features/add-tracks/interface";
import { api } from "./api";

type IYouTubeVideoInfoRequest = string;

export interface IYouTubeVideoInfoResponse {
  title: string;
  channel: string;
  length: number;
  thumbnailUrl: string;
}

export interface IYouTubeVideoDownloadRequest {
  url: string;
  spotifyId: string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
}

type IYouTubeVideoDownloadResponse = string;

type IAddTrackViaFileUploadRequest = FormData;

type IAddTrackViaFileUploadResponse = string;

interface ISearchForTrackInSpotifyRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface ISearchForTrackInSpotifyResponse {
  id: string;
  track: {
    uri: string;
    name: string;
  };
  album: {
    uri: string;
    name: string;
    image: string;
  };
  artist: {
    uri: string;
    name: string;
  };
}

// https://github.com/reduxjs/redux-toolkit/discussions/2052
export const acquireTracksApi = api.injectEndpoints({
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
    addTrackViaFileUpload: builder.mutation<
      IAddTrackViaFileUploadResponse,
      IAddTrackViaFileUploadRequest
    >({
      query: (body) => ({
        url: "acquire-tracks/upload",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["Tracks"],
    }),
    searchForTrackInSpotify: builder.query<
      ISearchForTrackInSpotifyResponse[],
      ISearchForTrackInSpotifyRequest
    >({
      query: ({ query, limit, offset }) => ({
        url: `acquire-tracks/spotify-search`,
        params: { query, limit, offset },
      }),
    }),
  }),
});

export const {
  useLazyGetYouTubeVideoInfoQuery,
  useAddYouTubeVideoMutation,
  useAddTrackViaFileUploadMutation,
  useLazySearchForTrackInSpotifyQuery,
} = acquireTracksApi;
