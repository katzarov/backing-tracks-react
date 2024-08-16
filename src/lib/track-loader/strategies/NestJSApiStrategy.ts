import { nonRTKQueryApi } from "@api";
import { AbstractFetchingStrategy } from "../TrackLoader";

export class NestJSApiStrategy implements AbstractFetchingStrategy {
  async fetchTrack(uri: string) {
    const blob = await nonRTKQueryApi.fetchTrackFromNestJSApi(uri);
    return blob;
  }
}
