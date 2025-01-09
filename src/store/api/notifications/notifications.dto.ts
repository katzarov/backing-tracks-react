import {
  TrackInstrument,
  TrackType,
} from "@src/components/add-tracks/interface";
import { IAlbumArtImage } from "../tracks";

// TODO finally setup TS reference between the two project

export type FinishedStatus = "completed" | "failed";
export type JobState =
  | FinishedStatus
  | "active"
  | "delayed"
  | "prioritized"
  | "waiting"
  | "waiting-children";

export interface YtDownloadReturnType {
  success: boolean;
  ffProbeTrackDuration: number | null;
}

export interface YtdlJobData {
  userId: number;
  ytUrl: string;
  trackUri: string;
  meta: {
    spotify: {
      trackUri: string;
      trackName: string;
      trackDuration: number;
      artistUri: string;
      artistName: string;
      albumArt: {
        small: IAlbumArtImage | null;
        medium: IAlbumArtImage | null;
        large: IAlbumArtImage | null;
      };
    };
    trackType: TrackType;
    trackInstrument: TrackInstrument;
  };
}

export interface YtdlJobFormatted {
  name: "yt_download";
  id: string;
  data: YtdlJobData;
  state: JobState | "unknown";
  progress: number | object;
  returnvalue: YtDownloadReturnType;
  timestamp: number; // when job was created
  finishedOn: number;
  // processedOn: number;
  // failedReason: string;
  // stacktrace: string[];
}
