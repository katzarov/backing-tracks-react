import { ITrackResponseDto } from "@api/tracks";

export type IPlaylistRequestDto = void;

export interface IPlaylistResponseDto {
  id: number;
  name: string;
  description: string;
}

export type IPlaylistWithTracksRequestDto = number;

export interface IPlaylistWithTracksResponseDto {
  id: number;
  name: string;
  description: string;
  tracks: ITrackResponseDto[];
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
