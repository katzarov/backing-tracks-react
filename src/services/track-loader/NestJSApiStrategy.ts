import { nonRTKQueryApi } from "../../store/api/api";

export class NestJSApiStrategy {
  private static async getTrackFromNestJSApi(uri: string) {
    const blob = await nonRTKQueryApi.fetchTrackFromNestJSApi(uri);
    return blob;
  }

  /**
   * - First, tries loading the track from indexedDB (but that can configured to be bypassed).
   * - if not found,  fetches the data from our api, saves it in indexedDB (can configured to be bypassed).
   * - creates a blob url for use with the player.
   */
  static async loadTrack(uri: string) {
    const blob = await this.getTrackFromNestJSApi(uri);
    return blob;
  }
}
