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

export type ICreatePlaylistRequestDto = Omit<IPlaylistResponseDto, "id">;

export type ICreatePlaylistResponseDto = string;
