import { store } from "../../../store";
import { nonRTKQueryApi } from "@api";
import { tracksApi } from "@api/tracks";
import { AbstractFetchingStrategy } from "../TrackLoader";

export class S3Strategy implements AbstractFetchingStrategy {
  async fetchTrack(uri: string) {
    const promise = store.dispatch(
      tracksApi.endpoints.getS3PresignedUrlForTrack.initiate(uri, {
        subscribe: false,
        forceRefetch: true,
      })
    );

    const { data, isSuccess, error } = await promise;

    if (isSuccess) {
      const blob = await nonRTKQueryApi.fetchTrackFromS3Bucket(data.url);
      return blob;
    } else {
      console.error(error);
      return null;
    }
  }
}
