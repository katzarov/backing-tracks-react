import {
  IAddTrackViaFileUploadRequestDto,
  IAddTrackViaFileUploadResponseDto,
  ISearchForTrackInSpotifyRequestDto,
  ISearchForTrackInSpotifyResponseDto,
  IAddYouTubeDownloadJobRequestDto,
  IAddYouTubeDownloadJobResponseDto,
  IYouTubeVideoInfoRequestDto,
  IYouTubeVideoInfoResponseDto,
} from ".";
import { api, listId } from "../rtk-query-api-config";

// https://github.com/reduxjs/redux-toolkit/discussions/2052
export const acquireTracksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getYouTubeVideoInfo: builder.query<
      IYouTubeVideoInfoResponseDto,
      IYouTubeVideoInfoRequestDto
    >({
      query: (videoUrl) => ({
        url: `acquire-tracks/youtube/info/${encodeURIComponent(videoUrl)}`,
      }),
    }),
    addYouTubeDownloadJob: builder.mutation<
      IAddYouTubeDownloadJobResponseDto,
      IAddYouTubeDownloadJobRequestDto
    >({
      query: (body) => ({
        url: "acquire-tracks/youtube/add-job",
        method: "POST",
        body,
      }),
    }),
    addTrackViaFileUpload: builder.mutation<
      IAddTrackViaFileUploadResponseDto,
      IAddTrackViaFileUploadRequestDto
    >({
      query: (body) => ({
        url: "acquire-tracks/upload",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: [{ type: "Track", id: listId }],
    }),
    searchForTrackInSpotify: builder.query<
      ISearchForTrackInSpotifyResponseDto[],
      ISearchForTrackInSpotifyRequestDto
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
  useAddYouTubeDownloadJobMutation,
  useAddTrackViaFileUploadMutation,
  useLazySearchForTrackInSpotifyQuery,
} = acquireTracksApi;
