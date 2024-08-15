import { store } from "../../../store";
import { nonRTKQueryApi } from "../../../store/api/api.config";
import { tracksApi } from "../../../store/api/tracks";
import { AbstractFetchingStrategy } from "../TrackLoader";

export class S3Strategy implements AbstractFetchingStrategy {
  async fetchTrack(uri: string) {
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
}
