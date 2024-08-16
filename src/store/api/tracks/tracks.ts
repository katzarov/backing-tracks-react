import {
  IDeleteTrackRequestDto,
  IDeleteTrackResponseDto,
  ITrackRequestDto,
  ITrackResponseDto,
  ITrackS3PresignedUrlRequestDto,
  ITrackS3PresignedUrlResponseDto,
} from ".";
import { api } from "../rtk-query-api-config";

export const tracksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTracks: builder.query<ITrackResponseDto[], ITrackRequestDto>({
      query: () => ({ url: "tracks" }),
      providesTags: (result = []) => [
        ...result.map(
          ({ resourceId }) => ({ type: "Tracks", resourceId } as const)
        ),
        { type: "Tracks" as const, id: "LIST" },
      ],
    }),
    deleteTrack: builder.mutation<
      IDeleteTrackResponseDto,
      IDeleteTrackRequestDto
    >({
      query: (uri) => ({
        url: `tracks/${encodeURIComponent(uri)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracks"],
    }),
    getS3PresignedUrlForTrack: builder.query<
      ITrackS3PresignedUrlResponseDto,
      ITrackS3PresignedUrlRequestDto
    >({
      query: (uri) => ({ url: `tracks/s3-presigned-url/${uri}` }),
    }),
  }),
});

export const { useGetAllTracksQuery, useDeleteTrackMutation } = tracksApi;
