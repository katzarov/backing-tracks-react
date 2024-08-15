import {
  TrackInstrument,
  TrackType,
} from "../../features/add-tracks/interface";
import { api } from "./api.config";

interface ITrackResponse {
  resourceId: string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
  duration: number;
  meta: {
    trackName: string;
    artist: {
      artistName: string;
    };
  };

  name: string;
}

type IDeleteTrackRequest = string;

type IDeleteTrackResponse = string;

type ITrackS3PresignedUrlRequest = string;

interface ITrackS3PresignedUrlResponse {
  url: string;
}

export const tracksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTracks: builder.query<ITrackResponse[], void>({
      query: () => ({ url: "tracks" }),
      providesTags: (result = []) => [
        ...result.map(
          ({ resourceId }) => ({ type: "Tracks", resourceId } as const)
        ),
        { type: "Tracks" as const, id: "LIST" },
      ],
    }),
    deleteTrack: builder.mutation<IDeleteTrackResponse, IDeleteTrackRequest>({
      query: (uri) => ({
        url: `tracks/${encodeURIComponent(uri)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracks"],
    }),
    getS3PresignedUrlForTrack: builder.query<
      ITrackS3PresignedUrlResponse,
      ITrackS3PresignedUrlRequest
    >({
      query: (uri) => ({ url: `tracks/s3-presigned-url/${uri}` }),
    }),
  }),
});

export const { useGetAllTracksQuery, useDeleteTrackMutation } = tracksApi;
