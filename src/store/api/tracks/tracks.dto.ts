import {
  TrackInstrument,
  TrackType,
} from "../../../components/add-tracks/interface";

export type ITrackRequestDto = void;

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
  };
  playlists: Array<{ id: number; name: string; description: string }>;
}

export type IDeleteTrackRequestDto = string;

export type IDeleteTrackResponseDto = string;

export type ITrackS3PresignedUrlRequestDto = string;

export interface ITrackS3PresignedUrlResponseDto {
  url: string;
}
