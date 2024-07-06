import {
  TrackInstrument,
  TrackType,
} from "../../features/add-tracks/interface";
import { api } from "./api";

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
    getS3PresignedUrlForTrack: builder.query<
      ITrackS3PresignedUrlResponse,
      ITrackS3PresignedUrlRequest
    >({
      query: (uri) => ({ url: `tracks/s3-presigned-url/${uri}` }),
    }),
  }),
});

export const { useGetAllTracksQuery } = tracksApi;
