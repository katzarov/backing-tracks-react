import {
  TrackInstrument,
  TrackType,
} from "../../../components/add-tracks/interface";

export type ITrackRequestDto = void;

interface IAlbumArtImage {
  url: string;
  width: number;
  height: number;
}

export interface ITrackResponseDto {
  id: number;
  resourceId: string; // TODO remove
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
  playlists: Array<{ id: number; name: string; description: string }>;
}

export type IDeleteTrackRequestDto = number;

export type IDeleteTrackResponseDto = string;

export type ITrackS3PresignedUrlRequestDto = string;

export interface ITrackS3PresignedUrlResponseDto {
  url: string;
}
