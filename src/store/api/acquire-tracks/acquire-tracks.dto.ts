import {
  TrackInstrument,
  TrackType,
} from "src/components/add-tracks/interface";

export type IYouTubeVideoInfoRequestDto = string;

export interface IYouTubeVideoInfoResponseDto {
  title: string;
  channel: string;
  length: number;
  thumbnailUrl: string;
}

export interface IYouTubeVideoDownloadRequestDto {
  url: string;
  spotifyId: string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
}

export type IYouTubeVideoDownloadResponseDto = string;

export type IAddTrackViaFileUploadRequestDto = FormData;

export type IAddTrackViaFileUploadResponseDto = string;

export interface ISearchForTrackInSpotifyRequestDto {
  query: string;
  limit?: number;
  offset?: number;
}

export interface ISearchForTrackInSpotifyResponseDto {
  id: string;
  track: {
    uri: string;
    name: string;
  };
  album: {
    uri: string;
    name: string;
    image: string;
  };
  artist: {
    uri: string;
    name: string;
  };
}
