import { FC, useMemo } from "react";
import { AlertDialog } from "../../../shared/AlertDialog";
import { SelectablePlaylists } from "./SelectablePlaylists";
import { useGetAllPlaylistsQuery } from "@api/playlists";
import {
  useGetAllPlaylistsOfTrackQuery,
  useUpdatePlaylistsOfTrackMutation,
} from "@api/tracks";
import { useCheckboxListLogic } from "src/hooks/useCheckboxListLogic";
import { mergeTrackPlaylistsWithAllPlaylists } from "src/utils/playlist";

interface IEditPlaylistsOfTrackDialogProps {
  trackId: number;
  shouldOpenEditPlaylistsOfTrackDialog: boolean;
  handleCloseEditPlaylistsOfTrackDialog: () => void;
}

export const EditPlaylistsOfTrackDialog: FC<
  IEditPlaylistsOfTrackDialogProps
> = ({
  trackId,
  shouldOpenEditPlaylistsOfTrackDialog,
  handleCloseEditPlaylistsOfTrackDialog,
}) => {
  const { data: allPlaylists, isLoading: isLoadingGetAllPlaylists } =
    useGetAllPlaylistsQuery();

  const { data: playlistsOfTrack, isLoading: isLoadingPlaylistsOfTrack } =
    useGetAllPlaylistsOfTrackQuery(trackId);

  const [updatePlaylistsOfTrack, { isLoading: isLoadingEditPlaylistsOfTrack }] =
    useUpdatePlaylistsOfTrackMutation();

  const playlistsPreSelected = useMemo(
    () =>
      allPlaylists !== undefined && playlistsOfTrack?.playlists !== undefined
        ? mergeTrackPlaylistsWithAllPlaylists(
            playlistsOfTrack.playlists,
            allPlaylists
          )
        : [],
    [playlistsOfTrack, allPlaylists]
  );

  const { items, itemsEqualToInitialState, handleToggle } =
    useCheckboxListLogic(playlistsPreSelected);

  const handleAddToPlaylistNegative = () => {
    handleCloseEditPlaylistsOfTrackDialog();
  };

  const handleAddToPlaylistAffirmative = async () => {
    const newPlaylistsOfTrack = items
      .filter((item) => item.selected)
      .map((item) => ({
        id: item.id,
      }));

    try {
      await updatePlaylistsOfTrack({
        params: { trackId },
        body: { playlists: newPlaylistsOfTrack },
        rtkq_meta: { currentState: playlistsOfTrack?.playlists ?? [] },
      }).unwrap();

      handleCloseEditPlaylistsOfTrackDialog();
      // TODO: dispatch notification that it was updated successfylly
    } catch (e) {
      // TODO: dispatch notification that it was NOT updated
    }
  };

  return (
    <AlertDialog
      open={shouldOpenEditPlaylistsOfTrackDialog}
      showSpinner={
        isLoadingGetAllPlaylists ||
        isLoadingPlaylistsOfTrack ||
        isLoadingEditPlaylistsOfTrack
      }
      title="Add track to playlist"
      affirmativeButtonText="Save"
      negativeButtonText="Cancel"
      disableAffirmativeButton={itemsEqualToInitialState}
      onCloseNegative={handleAddToPlaylistNegative}
      onCloseAffirmative={handleAddToPlaylistAffirmative}
    >
      {isLoadingGetAllPlaylists || isLoadingPlaylistsOfTrack ? null : (
        <SelectablePlaylists
          playlistsPreSelected={items}
          handleToggle={handleToggle}
        />
      )}
    </AlertDialog>
  );
};
