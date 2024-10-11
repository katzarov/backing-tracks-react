import {
  TrackInstrument,
  TrackType,
} from "../../../components/add-tracks/interface";
import { IPlaylistResponseDto } from "../playlists";

interface IAlbumArtImage {
  url: string;
  width: number;
  height: number;
}

export type ITrackRequestDto = void;

export interface ITrackResponseDto {
  id: number;
  resourceId: string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
  duration: number;
  meta: {
    trackName: string;
    artist: {
      artistName: string;
    };
    albumArt: {
      small: IAlbumArtImage | null;
      medium: IAlbumArtImage | null;
      large: IAlbumArtImage | null;
    };
  };
}

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
