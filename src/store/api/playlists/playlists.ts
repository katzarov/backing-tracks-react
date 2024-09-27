import {
  ICreatePlaylistRequestDto,
  ICreatePlaylistResponseDto,
  IEditPlaylistsOfTrackRequestDto,
  IEditPlaylistsOfTrackResponseDto,
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
  useGetAllPlaylistsQuery,
  useCreatePlaylistMutation,
  useEditPlaylistsOfTrackMutation,
} = playlistsApi;
