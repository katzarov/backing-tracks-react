import { IPlaylistResponseDto } from "@api/playlists";
import { IGenericCheckboxItem } from "src/hooks/useCheckboxListLogic";

export interface IMergedTrackPlaylistsWithAllPlaylists
  extends IGenericCheckboxItem {
  name: string;
  description: string;
}
/**
 * Builds the required state for the playlist checkbox component.
 *
 * Running time: O(n^2) but this should be done only once at initial component load, so I think it will do.
 */
export const mergeTrackPlaylistsWithAllPlaylists = (
  trackPlaylists: IPlaylistResponseDto[],
  allPlaylists: IPlaylistResponseDto[]
): IMergedTrackPlaylistsWithAllPlaylists[] =>
  allPlaylists.map((playlist) => {
    const found = trackPlaylists.find(
      (trackPlaylist) => trackPlaylist.id === playlist.id
    );

    if (found !== undefined) {
      return { ...playlist, selected: true };
    }
    return { ...playlist, selected: false };
  });
