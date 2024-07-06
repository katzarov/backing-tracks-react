import { store } from "../../store";
import { nonRTKQueryApi } from "../../store/api/api";
import { tracksApi } from "../../store/api/tracks";

export class S3Strategy {
  private static async getTrackFromS3(uri: string) {
    // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks
    const promise = store.dispatch(
      tracksApi.endpoints.getS3PresignedUrlForTrack.initiate(uri)
    );
    promise.refetch();

    const { data, isSuccess, error } = await promise;
    promise.unsubscribe();

    if (isSuccess) {
      const blob = await nonRTKQueryApi.fetchTrackFromS3Bucket(data.url);
      return blob;
    } else {
      console.error(error);
      return null;
    }
  }

  /**
   * - First, tries loading the track from indexedDB:
   * - if not found, requests a s3 presigned url from the api.
   * - fetches the data from s3 & saves it in indexedDB.
   * - Second, creates a blob url for use with the player.
   */
  static async loadTrack(uri: string) {
    const blob = await this.getTrackFromS3(uri);
    return blob;
  }
}

