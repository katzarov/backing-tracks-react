import { ITrackResponseDto } from "../api/tracks";

export class PlaylistPlayerState {
  currentTrackIndex: number;

  constructor(
    public tracks: Array<ITrackResponseDto>,
    currentTrackId: ITrackResponseDto["id"]
  ) {
    this.currentTrackIndex = tracks.findIndex(
      (track) => track.id === currentTrackId
    );
  }

  previousIndex() {
    if (this.currentTrackIndex === 0) {
      return this.tracks.length - 1;
    }

    return this.currentTrackIndex - 1;
  }

  nextIndex() {
    if (this.currentTrackIndex === this.tracks.length - 1) {
      return 0;
    }

    return this.currentTrackIndex + 1;
  }

  previousTrack() {
    return this.tracks[this.previousIndex()].id;
  }

  nextTrack() {
    return this.tracks[this.nextIndex()].id;
  }
}
