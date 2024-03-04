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
  }),
});

export const { useGetAllTracksQuery } = tracksApi;
