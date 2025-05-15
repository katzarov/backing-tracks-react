import { IPlaylistResponseDto } from "../playlists";
import { ITrack } from "backing-tracks-isomorphic";

export interface IAlbumArtImage {
  url: string;
  width: number;
  height: number;
}

export type ITrackRequestDto = void;

export type ITrackResponseDto = ITrack;

export type IGetTrackRequestDto = ITrackResponseDto["id"];

export type IGetAllPlaylistsOfTrackRequestDto = ITrackResponseDto["id"];

export interface IGetAllPlaylistsOfTrackResponseDto extends ITrackResponseDto {
  playlists: Array<IPlaylistResponseDto>;
}

export interface IUpdatePlaylistsOfTrackRequestDto {
  params: {
    trackId: ITrackResponseDto["id"];
  };
  body: {
    playlists: Array<{ id: IPlaylistResponseDto["id"] }>;
  };
  rtkq_meta: {
    currentState: Array<{ id: IPlaylistResponseDto["id"] }>;
  };
}

export type IUpdatePlaylistsOfTrackResponseDto = string;

export type IDeleteTrackRequestDto = ITrackResponseDto["id"];

export type IDeleteTrackResponseDto = string;

export type ITrackS3PresignedUrlRequestDto = ITrackResponseDto["resourceId"];

export interface ITrackS3PresignedUrlResponseDto {
  url: string;
}
