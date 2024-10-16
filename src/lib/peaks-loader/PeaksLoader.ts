import { ITrackResponseDto } from "@src/store/api/tracks";
import { IndexedDB } from "../browser-storage";

interface IStoredPeaksData {
  uri: string;
  peaks: number[][];
}

export class PeaksLoader {
  static async savePeaks(
    uri: IStoredPeaksData["uri"],
    peaks: IStoredPeaksData["peaks"]
  ) {
    try {
      await IndexedDB.getInstance().add<IStoredPeaksData>(
        IndexedDB.peaksStore,
        {
          uri,
          peaks,
        }
      );
    } catch (error) {
      console.error("Some error with saving peaks to browser storage", error);
    }
  }

  static async loadPeaks(uri: ITrackResponseDto["resourceId"]) {
    try {
      const peaks = await IndexedDB.getInstance().get<IStoredPeaksData>(
        IndexedDB.peaksStore,
        uri
      );

      return peaks?.peaks ?? null;
    } catch (error) {
      console.error(
        "Some error with retrieving peaks from browser storage",
        error
      );

      return null;
    }
  }
}
