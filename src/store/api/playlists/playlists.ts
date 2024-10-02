import {
  ICreatePlaylistRequestDto,
  ICreatePlaylistResponseDto,
  IEditPlaylistsOfTrackRequestDto,
  IEditPlaylistsOfTrackResponseDto,
  IPlaylistWithTracksRequestDto,
  IPlaylistWithTracksResponseDto,
  IPlaylistRequestDto,
  IPlaylistResponseDto,
} from "./playlists.dto";
import { api } from "../rtk-query-api-config";

export const playlistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<IPlaylistResponseDto[], IPlaylistRequestDto>(
      {
        query: () => ({ url: "playlists" }),
        transformResponse: (response: IPlaylistResponseDto[]) =>
          response.sort((a, b) => a.name.localeCompare(b.name)),
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: "Playlists", id } as const)),
          { type: "Playlists" as const, id: "LIST" },
        ],
      }
    ),
    getPlaylistWithTracks: builder.query<
      IPlaylistWithTracksResponseDto,
      IPlaylistWithTracksRequestDto
    >({
      query: (id) => ({ url: `playlists/${id}` }),
      providesTags: (_result, _err, arg) => [
        { type: "Playlists", id: arg } as const,
      ],
    }),
    // PLaylists => PlaylistDetails ?
    // TODO need to learn more about rtk query and rethink the caching and some of the endpoints. Need to do more careful invalidation.
    createPlaylist: builder.mutation<
      ICreatePlaylistResponseDto,
      ICreatePlaylistRequestDto
    >({
      query: (body) => ({
        url: "playlists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Playlists"],
    }),
    editPlaylistsOfTrack: builder.mutation<
      IEditPlaylistsOfTrackResponseDto,
      IEditPlaylistsOfTrackRequestDto
    >({
      query: ({ params, body }) => ({
        url: `playlists/${params.trackId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tracks"],
    }),
  }),
});

export const {
  useGetPlaylistWithTracksQuery,
  useGetAllPlaylistsQuery,
  useCreatePlaylistMutation,
  useEditPlaylistsOfTrackMutation,
} = playlistsApi;
