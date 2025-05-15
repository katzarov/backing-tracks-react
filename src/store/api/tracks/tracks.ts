import { updatePlaylistsOfTrackInvalidation } from "@src/utils/playlist";
import {
  IDeleteTrackRequestDto,
  IDeleteTrackResponseDto,
  IUpdatePlaylistsOfTrackRequestDto,
  IUpdatePlaylistsOfTrackResponseDto,
  ITrackRequestDto,
  ITrackResponseDto,
  ITrackS3PresignedUrlRequestDto,
  ITrackS3PresignedUrlResponseDto,
  IGetAllPlaylistsOfTrackRequestDto,
  IGetAllPlaylistsOfTrackResponseDto,
  IGetTrackRequestDto,
} from ".";
import { api, listId } from "../rtk-query-api-config";
import { IUpdateTrackRequest } from "backing-tracks-isomorphic";

export const tracksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTracks: builder.query<ITrackResponseDto[], ITrackRequestDto>({
      query: () => ({ url: "tracks" }),
      providesTags: (result = []) => [
        ...result.map((item) => ({
          type: "Track" as const,
          id: item.id,
        })),
        { type: "Track", id: listId },
      ],
    }),
    getTrack: builder.query<ITrackResponseDto, IGetTrackRequestDto>({
      query: (id) => ({ url: `tracks/${id}` }),
      providesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: "Track", id: result!.id }];
      },
    }),
    getAllPlaylistsOfTrack: builder.query<
      IGetAllPlaylistsOfTrackResponseDto,
      IGetAllPlaylistsOfTrackRequestDto
    >({
      query: (trackId) => ({ url: `tracks/${trackId}/playlists` }),
      providesTags: (result, _error, arg) => [
        { type: "PlaylistsOfTrack", id: arg },
        ...(result?.playlists ?? []).map((item) => ({
          type: "Playlist" as const,
          id: item.id,
        })),
      ],
    }),
    updateTrack: builder.mutation<
      void,
      { params: { trackId: number }; body: IUpdateTrackRequest }
    >({
      query: ({ params, body }) => ({
        url: `tracks/${params.trackId}`,
        method: "PATCH",
        body,
      }),
      // TODO: I dont remember, if the fetch errors does it invalidate the cache or not ?
      invalidatesTags: (_result, _error, { params }) => [
        { type: "Track", id: params.trackId },
      ],
    }),
    updatePlaylistsOfTrack: builder.mutation<
      IUpdatePlaylistsOfTrackResponseDto,
      IUpdatePlaylistsOfTrackRequestDto
    >({
      query: ({ params, body }) => ({
        url: `tracks/${params.trackId}/playlists`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "PlaylistsOfTrack", id: args.params.trackId },
        ...updatePlaylistsOfTrackInvalidation(
          args.rtkq_meta.currentState,
          args.body.playlists
        ),
      ],
    }),
    deleteTrack: builder.mutation<
      IDeleteTrackResponseDto,
      IDeleteTrackRequestDto
    >({
      query: (id) => ({
        url: `tracks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Track", id: arg }],
    }),
    getS3PresignedUrlForTrack: builder.query<
      ITrackS3PresignedUrlResponseDto,
      ITrackS3PresignedUrlRequestDto
    >({
      query: (uri) => ({ url: `tracks/s3-presigned-url/${uri}` }),
    }),
  }),
});

export const {
  useGetAllTracksQuery,
  useGetTrackQuery,
  useLazyGetTrackQuery,
  useGetAllPlaylistsOfTrackQuery,
  useUpdateTrackMutation,
  useUpdatePlaylistsOfTrackMutation,
  useDeleteTrackMutation,
} = tracksApi;
