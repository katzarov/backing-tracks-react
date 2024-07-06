import { NestJSApiStrategy } from "./NestJSApiStrategy";
import { S3Strategy } from "./S3Strategy";

const useS3ToDownloadTrack =
  (import.meta.env.VITE_USE_S3_TO_DOWNLOAD_TRACK as string).toLowerCase() ===
  "true";

export class TrackLoader {
  static loadTrack(uri: string) {
    // TODO: first, save tracks to indexedDB and try to get them from there if already saved.
    // TODO: dispatch loading action to show spinner and etc
    if (useS3ToDownloadTrack) {
      return S3Strategy.loadTrack(uri);
    } else {
      return NestJSApiStrategy.loadTrack(uri);
    }
  }
}
