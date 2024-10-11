import { IPlaylistResponseDto } from "@api/playlists";
import { listId, ITagTypes } from "@src/store/api";
import { IGetAllPlaylistsOfTrackResponseDto } from "@src/store/api/tracks";
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
  trackPlaylists: IGetAllPlaylistsOfTrackResponseDto["playlists"],
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

const getSymmetricDifference = <T extends number | string>(
  arr1: Array<T>,
  arr2: Array<T>
) => {
  // Set.prototype.symmetricDifference would have been sweet but I am not going to do polyfills
  return arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x)));
};

/**
 * Returns the 'TracksOfPlaylist' ids that need to be invalidated.
 * And that is the symmetric difference between the two arrays - if a specific ID is only in one of the arrays, then its entity needs to be invalidated.
 */
export const updatePlaylistsOfTrackInvalidation = (
  currentState: Array<{ id: number }>,
  newState: Array<{ id: number }>
): Array<{
  type: ITagTypes;
  id: number | typeof listId;
}> => {
  const tracksOfPlaylistIdsToInvalidate = getSymmetricDifference<number>(
    currentState.map((item) => item.id),
    newState.map((item) => item.id)
  );

  return tracksOfPlaylistIdsToInvalidate.map((id) => ({
    type: "TracksOfPlaylist",
    id: id,
  }));
};
