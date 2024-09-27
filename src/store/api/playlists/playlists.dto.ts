export type IPlaylistRequestDto = void;

export interface IPlaylistResponseDto {
  id: number;
  name: string;
  description: string;
}

export interface IEditPlaylistsOfTrackRequestDto {
  params: {
    trackId: number;
  };
  body: {
    playlists: Array<{ id: number }>;
  };
}

export type IEditPlaylistsOfTrackResponseDto = string;

export interface ICreatePlaylistRequestDto {
  name: string;
  description?: string;
}

export type ICreatePlaylistResponseDto = string;
