import {
  ICreatePlaylistRequestDto,
  ICreatePlaylistResponseDto,
  ITracksOfPlaylistRequestDto,
  ITracksOfPlaylistResponseDto,
  IPlaylistRequestDto,
  IPlaylistResponseDto,
  IGetPlaylistRequestDto,
} from "./playlists.dto";
import { api, listId } from "../rtk-query-api-config";

export const playlistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<IPlaylistResponseDto[], IPlaylistRequestDto>(
      {
        query: () => ({ url: "playlists" }),
        transformResponse: (response: IPlaylistResponseDto[]) =>
          response.sort((a, b) => a.name.localeCompare(b.name)),
        providesTags: (result = []) => [
          ...result.map((item) => ({
            type: "Playlist" as const,
            id: item.id,
          })),
          { type: "Playlist", id: listId },
        ],
      }
    ),
    getPlaylist: builder.query<IPlaylistResponseDto, IGetPlaylistRequestDto>({
      query: (id) => ({ url: `playlists/${id}` }),
      providesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [{ type: "Playlist", id: result!.id }];
      },
    }),
    getTracksOfPlaylist: builder.query<
      ITracksOfPlaylistResponseDto,
      ITracksOfPlaylistRequestDto
    >({
      query: (id) => ({ url: `playlists/${id}/tracks` }),
      providesTags: (result, _err, arg) => [
        { type: "TracksOfPlaylist", id: arg } as const,
        ...(result?.tracks ?? []).map((item) => ({
          type: "Track" as const,
          id: item.id,
        })),
      ],
    }),
    createPlaylist: builder.mutation<
      ICreatePlaylistResponseDto,
      ICreatePlaylistRequestDto
    >({
      query: (body) => ({
        url: "playlists",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Playlist", id: listId }],
    }),
    // TODO on name change or remove playlist will need to invalidate all cache of PlaylistsOfTrack
  }),
});

export const {
  useGetTracksOfPlaylistQuery,
  useLazyGetPlaylistQuery,
  useGetAllPlaylistsQuery,
  useCreatePlaylistMutation,
} = playlistsApi;
