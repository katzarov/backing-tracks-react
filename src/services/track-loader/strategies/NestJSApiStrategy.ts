import { nonRTKQueryApi } from "../../../store/api/api.config";
import { AbstractFetchingStrategy } from "../TrackLoader";

export class NestJSApiStrategy implements AbstractFetchingStrategy {
  async fetchTrack(uri: string) {
    const blob = await nonRTKQueryApi.fetchTrackFromNestJSApi(uri);
    return blob;
  }
}
