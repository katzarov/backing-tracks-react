import { YtdlJobFormatted } from "./notifications.dto";

export interface IYtdlState {
  ytdl: {
    jobs: YtdlJobFormatted[];
    count: {
      active: number;
      waiting: number;
      failed: number;
    };
  };
}

export type NotificationsState = IYtdlState; // & IFutureState

export interface YtdlSyncMessage {
  state: NotificationsState;
}

export interface YtdlUpdateMessage {
  state: { ytdl: YtdlJobFormatted };
}

export enum MessageType {
  ytdlSync = "ytdl-sync", // sync the current ytdl job queue state with client
  ytdlSyncInvalidateDB = "ytdl-sync-invalidate-db", // same as ytdlSync, but also instructs client to refresh its cached db responses.
  ytdlUpdate = "ytdl-update", // give updates for individual items of the ytdl queue state
}
