import { IndexedDB } from "../browser-storage";
import { NestJSApiStrategy } from "./strategies/NestJSApiStrategy";
import { S3Strategy } from "./strategies/S3Strategy";

interface IStoredTrackData {
  uri: string;
  trackBlob: Blob;
}

export abstract class AbstractFetchingStrategy {
  abstract fetchTrack(uri: string): Promise<Blob | null>;
}

export class TrackLoader {
  private static fetchingStrategy: AbstractFetchingStrategy;
  static {
    const useS3ToDownloadTrack =
      (
        import.meta.env.VITE_USE_S3_TO_DOWNLOAD_TRACK as string
      ).toLowerCase() === "true";

    // TODO: Just for fun, instead of doing this decison at build time => lets do it at runtime, fetch config from api and inject the appropriate module - use inversify/tsyringe/some IoC container.
    TrackLoader.fetchingStrategy = useS3ToDownloadTrack
      ? new S3Strategy()
      : new NestJSApiStrategy();
  }

  /**
   * Loads track.
   * - first, tries loading the track from indexedDB.
   * - if not found, requests it from either the nest api or s3. If so, then saves it to indexedDB.
   *
   * @param {string} uri - uri of the track to load.
   * @returns {Promise<Blob | null> } Blob if track was successfully retrieved, otherwise null.
   */
  static async loadTrack(uri: string) {
    try {
      const trackBlobFromBrowserStorage =
        await IndexedDB.getInstance().get<IStoredTrackData>(
          IndexedDB.trackStore,
          uri
        );

      if (trackBlobFromBrowserStorage !== null) {
        return trackBlobFromBrowserStorage.trackBlob;
      }
    } catch (error) {
      console.error(
        "Some error with retrieving track from browser storage",
        error
      );
    }

    const trackBlobFromServer = await this.fetchingStrategy.fetchTrack(uri);

    if (trackBlobFromServer === null) {
      console.error("Can't fetch track from server.");
      return null;
    }

    try {
      await IndexedDB.getInstance().add<IStoredTrackData>(
        IndexedDB.trackStore,
        {
          uri,
          trackBlob: trackBlobFromServer,
        }
      );
    } catch (error) {
      console.error("Some error with saving track to browser storage", error);
    }

    return trackBlobFromServer;
  }
}
