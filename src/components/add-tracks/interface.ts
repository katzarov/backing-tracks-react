import { ISearchForTrackInSpotifyResponseDto } from "@api/acquire-tracks";

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

export type ILinkToYouTubeTrackResult = IYoutubeTrackData & {
  preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponseDto[];
};

export interface IUploadTrackProps extends ISteps<IUploadTrackResult> {}

export type IUploadTrackResult = IFileTrackData & {
  preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponseDto[];
};

export interface IFindTrackInSpotifyProps
  extends ISteps<IFindTrackInSpotifyResult> {
  trackUri: File | string;
  trackType: TrackType;
  trackInstrument: TrackInstrument;
  preliminaryTrackName: string;
  preliminarySpotifySearchSuggestions: ISearchForTrackInSpotifyResponseDto[];
  setDialogDisableClose: (value: boolean) => void;
}

export type IFindTrackInSpotifyResult = { trackName: string } | undefined;

export interface IManuallyEnterTrackProps extends ISteps<undefined> {
  trackUri: string;
  preliminaryTrackName: string;
}
