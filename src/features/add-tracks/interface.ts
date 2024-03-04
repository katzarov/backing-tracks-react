import { ISearchForTrackInSpotifyResponse } from "../../store/api/acquireTracks";

export interface ISteps<T> {
  onStepComplete: (stepData: T) => void;
  onResetAllSteps?: () => void;
}

export enum TrackType {
  BACKING = "BACKING",
  JAM = "JAM",
}

export enum TrackInstrument {
  GUITAR = "GUITAR",
  BASS = "BASS",
}

export interface ITrackData {
  trackName: string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
}

export interface IYoutubeTrackData extends ITrackData {
  youtubeUrl: string;
}

export interface IFileTrackData extends ITrackData {
  file: File;
}

export interface ILinkToYouTubeTrackProps
  extends ISteps<ILinkToYouTubeTrackResult> {}

export type ILinkToYouTubeTrackResult =
  | IYoutubeTrackData
  | (IYoutubeTrackData & {
      preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponse[];
    });

export interface IUploadTrackProps extends ISteps<IUploadTrackResult> {}

export type IUploadTrackResult =
  | IFileTrackData
  | (IFileTrackData & {
      preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponse[];
    });

export interface IFindTrackInSpotifyProps
  extends ISteps<IFindTrackInSpotifyResult> {
  trackUri: File | string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
  preliminaryTrackName: string;
  preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponse[];
}

export type IFindTrackInSpotifyResult = { trackName: string } | undefined;

export interface IManuallyEnterTrackProps extends ISteps<undefined> {
  trackUri: string;
  preliminaryTrackName: string;
}
