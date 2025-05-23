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

/**
 * The progress a job has performed so far.
 * @defaultValue 0 - when job is initialized. And after its taken by a processor, the job data gets updated with percentage and eta
 */
type YtdlJobProgress =
  | number
  | {
      percent: number | null;
      eta: number | null;
    };

// incorrect types => will get fixed soon when we start using the bti pkg.
export interface YtdlJobFormatted {
  name: "yt_download";
  id: string;
  data: YtdlJobData;
  state: JobState | "unknown";
  progress: YtdlJobProgress;
  returnvalue: YtDownloadReturnType;
  timestamp: number; // when job was created
  finishedOn: number;
  // processedOn: number;
  // failedReason: string;
  // stacktrace: string[];
}
