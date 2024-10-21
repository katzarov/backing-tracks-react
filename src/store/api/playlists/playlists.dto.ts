import { ITrackResponseDto } from "@api/tracks";

export type IPlaylistRequestDto = void;

export interface IPlaylistResponseDto {
  id: number;
  name: string;
  description: string;
}

export type IGetPlaylistRequestDto = IPlaylistResponseDto["id"];

export type ITracksOfPlaylistRequestDto = IPlaylistResponseDto["id"];

export interface ITracksOfPlaylistResponseDto extends IPlaylistResponseDto {
  tracks: Array<ITrackResponseDto>;
}

export interface ICreatePlaylistRequestDto {
  name: string;
  description?: string;
}

export type ICreatePlaylistResponseDto = string;
